'use client';

import axios from 'axios';
import Button from '../common/Button';
import Cards from './Cards';
import { Diary, DiaryList } from '@/types/diary.type';
import { formatFullDate } from '@/utils/dateUtils';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { useQuery } from '@tanstack/react-query';

const MainSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newDate = new Date(
    Number(searchParams.get('YYMM')?.slice(0, 4)),
    Number(searchParams.get('YYMM')?.slice(4, 6)) - 1,
    1
  );
  const makeQueryString = (form: String, date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (form === 'YYMM') {
      if (String(date.getMonth() + 1).length === 1) {
        return Number(String(year) + String(0) + String(month));
      } else {
        return Number(String(year) + String(month));
      }
    } else {
      if (String(date.getMonth() + 1).length === 1) {
        setQueryString(`?form=${form}&YYMM=${String(year) + String(0) + String(month)}`);
      } else {
        setQueryString(`?form=${form}&YYMM=${String(year) + String(month)}`);
      }
    }
  };
  const today = new Date();
  const todayYYMM = makeQueryString('YYMM', today) as number;
  const getInitialValue = (type: string) => {
    if (type === 'date') {
      return searchParams.get('YYMM') ? newDate : today;
    }
    if (type === 'form') {
      return searchParams.get('form') ? searchParams.get('form') : 'calendar';
    }
  };
  const [queryString, setQueryString] = useState<string>();
  const [date, setDate] = useState<Date>(getInitialValue('date') as Date);
  const [form, setForm] = useState<String>(getInitialValue('form') as string);
  const [isNeedNew, setIsNeedNew] = useState<boolean>(false);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const diaries = useQuery<DiaryList>({
    queryKey: ['diaries', 'main', year, month],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const { user } = data;
      if (user) {
        const { data } = await axios.get(`/api/diaries?year=${year}&month=${month}`);
        checkTodayWritten(data);
        return data;
      } else {
        const data = JSON.parse(localStorage.getItem('localDiaries') || '[]');
        checkTodayWritten(data);
        return data;
      }
    }
  });

  useEffect(() => {
    setDate(date);
  }, [date]);

  useEffect(() => {
    makeQueryString(form, date);
  }, [form, date]);

  useEffect(() => {
    if (queryString) {
      router.push(`${queryString}`);
    }
  }, [queryString]);

  const checkTodayWritten = (data: DiaryList) => {
    setIsNeedNew(false);
    if (formatFullDate(String(data[0]?.date)).slice(0, 7) === formatFullDate(String(today)).slice(0, 7)) {
      const findDiary = data.find((i: Diary) => {
        return new Date(i.date).getDate() === today.getDate();
      });
      if (findDiary) {
        setIsNeedNew(false);
      } else {
        setIsNeedNew(true);
      }
    }
  };

  const changeForm = (name: string) => {
    if (name === form) {
      return;
    }
    setForm(name);
  };

  const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (date) {
      setDate(date);
    }
  };

  if (diaries.isLoading) {
    return <div className="mt-[40rem] ml-[80rem] text-24px">loading..</div>;
  }

  return (
    <div className="flex flex-col min-w-[335px] w-335px-row-m md:w-744px-row mx-auto mt-[96px] md:mt-[128px] space-y-24px-col-m">
      <div className="flex justify-between">
        <p className="text-18px-m md:text-24px font-bold">나의 감정 기록</p>
        <div className="flex items-center">
          <button
            name="calendar"
            onClick={(e) => {
              changeForm(e.currentTarget.name);
            }}
          >
            <div className="flex items-center cursor-pointer">
              <p className="text-12px-m md:text-14px">캘린더</p>
              {form === 'calendar' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5.5 3C4.83696 3 4.20107 3.26339 3.73223 3.73223C3.26339 4.20107 3 4.83696 3 5.5V6H17V5.5C17 4.83696 16.7366 4.20107 16.2678 3.73223C15.7989 3.26339 15.163 3 14.5 3H5.5ZM17 7H3V14.5C3 15.163 3.26339 15.7989 3.73223 16.2678C4.20107 16.7366 4.83696 17 5.5 17H14.5C15.163 17 15.7989 16.7366 16.2678 16.2678C16.7366 15.7989 17 15.163 17 14.5V7ZM8 10C8 10.2652 7.89464 10.5196 7.70711 10.7071C7.51957 10.8946 7.26522 11 7 11C6.73478 11 6.48043 10.8946 6.29289 10.7071C6.10536 10.5196 6 10.2652 6 10C6 9.73478 6.10536 9.48043 6.29289 9.29289C6.48043 9.10536 6.73478 9 7 9C7.26522 9 7.51957 9.10536 7.70711 9.29289C7.89464 9.48043 8 9.73478 8 10ZM7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14ZM11 10C11 10.2652 10.8946 10.5196 10.7071 10.7071C10.5196 10.8946 10.2652 11 10 11C9.73478 11 9.48043 10.8946 9.29289 10.7071C9.10536 10.5196 9 10.2652 9 10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9C10.2652 9 10.5196 9.10536 10.7071 9.29289C10.8946 9.48043 11 9.73478 11 10ZM10 14C9.73478 14 9.48043 13.8946 9.29289 13.7071C9.10536 13.5196 9 13.2652 9 13C9 12.7348 9.10536 12.4804 9.29289 12.2929C9.48043 12.1054 9.73478 12 10 12C10.2652 12 10.5196 12.1054 10.7071 12.2929C10.8946 12.4804 11 12.7348 11 13C11 13.2652 10.8946 13.5196 10.7071 13.7071C10.5196 13.8946 10.2652 14 10 14ZM14 10C14 10.2652 13.8946 10.5196 13.7071 10.7071C13.5196 10.8946 13.2652 11 13 11C12.7348 11 12.4804 10.8946 12.2929 10.7071C12.1054 10.5196 12 10.2652 12 10C12 9.73478 12.1054 9.48043 12.2929 9.29289C12.4804 9.10536 12.7348 9 13 9C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10Z"
                    fill="#080808"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 11C7.26522 11 7.51957 10.8946 7.70711 10.7071C7.89464 10.5196 8 10.2652 8 10C8 9.73478 7.89464 9.48043 7.70711 9.29289C7.51957 9.10536 7.26522 9 7 9C6.73478 9 6.48043 9.10536 6.29289 9.29289C6.10536 9.48043 6 9.73478 6 10C6 10.2652 6.10536 10.5196 6.29289 10.7071C6.48043 10.8946 6.73478 11 7 11ZM8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13ZM10 11C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10C11 9.73478 10.8946 9.48043 10.7071 9.29289C10.5196 9.10536 10.2652 9 10 9C9.73478 9 9.48043 9.10536 9.29289 9.29289C9.10536 9.48043 9 9.73478 9 10C9 10.2652 9.10536 10.5196 9.29289 10.7071C9.48043 10.8946 9.73478 11 10 11ZM11 13C11 13.2652 10.8946 13.5196 10.7071 13.7071C10.5196 13.8946 10.2652 14 10 14C9.73478 14 9.48043 13.8946 9.29289 13.7071C9.10536 13.5196 9 13.2652 9 13C9 12.7348 9.10536 12.4804 9.29289 12.2929C9.48043 12.1054 9.73478 12 10 12C10.2652 12 10.5196 12.1054 10.7071 12.2929C10.8946 12.4804 11 12.7348 11 13ZM13 11C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9C12.7348 9 12.4804 9.10536 12.2929 9.29289C12.1054 9.48043 12 9.73478 12 10C12 10.2652 12.1054 10.5196 12.2929 10.7071C12.4804 10.8946 12.7348 11 13 11ZM17 5.5C17 4.83696 16.7366 4.20107 16.2678 3.73223C15.7989 3.26339 15.163 3 14.5 3H5.5C4.83696 3 4.20107 3.26339 3.73223 3.73223C3.26339 4.20107 3 4.83696 3 5.5V14.5C3 15.163 3.26339 15.7989 3.73223 16.2678C4.20107 16.7366 4.83696 17 5.5 17H14.5C15.163 17 15.7989 16.7366 16.2678 16.2678C16.7366 15.7989 17 15.163 17 14.5V5.5ZM4 7H16V14.5C16 14.8978 15.842 15.2794 15.5607 15.5607C15.2794 15.842 14.8978 16 14.5 16H5.5C5.10218 16 4.72064 15.842 4.43934 15.5607C4.15804 15.2794 4 14.8978 4 14.5V7ZM5.5 4H14.5C14.8978 4 15.2794 4.15804 15.5607 4.43934C15.842 4.72064 16 5.10218 16 5.5V6H4V5.5C4 5.10218 4.15804 4.72064 4.43934 4.43934C4.72064 4.15804 5.10218 4 5.5 4Z"
                    fill="#080808"
                  />
                </svg>
              )}
            </div>
          </button>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11.3998 3.6C11.5589 3.6 11.7115 3.66321 11.8241 3.77573C11.9366 3.88826 11.9998 4.04087 11.9998 4.2V19.8C11.9998 19.9591 11.9366 20.1117 11.8241 20.2243C11.7115 20.3368 11.5589 20.4 11.3998 20.4C11.2407 20.4 11.0881 20.3368 10.9755 20.2243C10.863 20.1117 10.7998 19.9591 10.7998 19.8V4.2C10.7998 4.04087 10.863 3.88826 10.9755 3.77573C11.0881 3.66321 11.2407 3.6 11.3998 3.6Z"
                fill="#080808"
              />
            </svg>
          </div>
          <button
            name="cards"
            onClick={(e) => {
              changeForm(e.currentTarget.name);
            }}
          >
            <div className="flex items-center cursor-pointer">
              <p className="text-12px-m md:text-14px">카드</p>
              {form === 'cards' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 11C7.89782 11 8.27936 11.158 8.56066 11.4393C8.84196 11.7206 9 12.1022 9 12.5V16.5C9 16.8978 8.84196 17.2794 8.56066 17.5607C8.27936 17.842 7.89782 18 7.5 18H3.5C3.10218 18 2.72064 17.842 2.43934 17.5607C2.15804 17.2794 2 16.8978 2 16.5V12.5C2 12.1022 2.15804 11.7206 2.43934 11.4393C2.72064 11.158 3.10218 11 3.5 11H7.5ZM16.5 11C16.8978 11 17.2794 11.158 17.5607 11.4393C17.842 11.7206 18 12.1022 18 12.5V16.5C18 16.8978 17.842 17.2794 17.5607 17.5607C17.2794 17.842 16.8978 18 16.5 18H12.5C12.1022 18 11.7206 17.842 11.4393 17.5607C11.158 17.2794 11 16.8978 11 16.5V12.5C11 12.1022 11.158 11.7206 11.4393 11.4393C11.7206 11.158 12.1022 11 12.5 11H16.5ZM7.5 2C7.89782 2 8.27936 2.15804 8.56066 2.43934C8.84196 2.72064 9 3.10218 9 3.5V7.5C9 7.89782 8.84196 8.27936 8.56066 8.56066C8.27936 8.84196 7.89782 9 7.5 9H3.5C3.10218 9 2.72064 8.84196 2.43934 8.56066C2.15804 8.27936 2 7.89782 2 7.5V3.5C2 3.10218 2.15804 2.72064 2.43934 2.43934C2.72064 2.15804 3.10218 2 3.5 2H7.5ZM16.5 2C16.8978 2 17.2794 2.15804 17.5607 2.43934C17.842 2.72064 18 3.10218 18 3.5V7.5C18 7.89782 17.842 8.27936 17.5607 8.56066C17.2794 8.84196 16.8978 9 16.5 9H12.5C12.1022 9 11.7206 8.84196 11.4393 8.56066C11.158 8.27936 11 7.89782 11 7.5V3.5C11 3.10218 11.158 2.72064 11.4393 2.43934C11.7206 2.15804 12.1022 2 12.5 2H16.5Z"
                    fill="#080808"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="#080808">
                  <path
                    d="M7.5 11C7.89782 11 8.27936 11.158 8.56066 11.4393C8.84196 11.7206 9 12.1022 9 12.5V16.5C9 16.8978 8.84196 17.2794 8.56066 17.5607C8.27936 17.842 7.89782 18 7.5 18H3.5C3.10218 18 2.72064 17.842 2.43934 17.5607C2.15804 17.2794 2 16.8978 2 16.5V12.5C2 12.1022 2.15804 11.7206 2.43934 11.4393C2.72064 11.158 3.10218 11 3.5 11H7.5ZM16.5 11C16.8978 11 17.2794 11.158 17.5607 11.4393C17.842 11.7206 18 12.1022 18 12.5V16.5C18 16.8978 17.842 17.2794 17.5607 17.5607C17.2794 17.842 16.8978 18 16.5 18H12.5C12.1022 18 11.7206 17.842 11.4393 17.5607C11.158 17.2794 11 16.8978 11 16.5V12.5C11 12.1022 11.158 11.7206 11.4393 11.4393C11.7206 11.158 12.1022 11 12.5 11H16.5ZM7.5 12H3.5C3.36739 12 3.24021 12.0527 3.14645 12.1464C3.05268 12.2402 3 12.3674 3 12.5V16.5C3 16.6326 3.05268 16.7598 3.14645 16.8536C3.24021 16.9473 3.36739 17 3.5 17H7.5C7.63261 17 7.75979 16.9473 7.85355 16.8536C7.94732 16.7598 8 16.6326 8 16.5V12.5C8 12.3674 7.94732 12.2402 7.85355 12.1464C7.75979 12.0527 7.63261 12 7.5 12ZM16.5 12H12.5C12.3674 12 12.2402 12.0527 12.1464 12.1464C12.0527 12.2402 12 12.3674 12 12.5V16.5C12 16.6326 12.0527 16.7598 12.1464 16.8536C12.2402 16.9473 12.3674 17 12.5 17H16.5C16.6326 17 16.7598 16.9473 16.8536 16.8536C16.9473 16.7598 17 16.6326 17 16.5V12.5C17 12.3674 16.9473 12.2402 16.8536 12.1464C16.7598 12.0527 16.6326 12 16.5 12ZM7.5 2C7.89782 2 8.27936 2.15804 8.56066 2.43934C8.84196 2.72064 9 3.10218 9 3.5V7.5C9 7.89782 8.84196 8.27936 8.56066 8.56066C8.27936 8.84196 7.89782 9 7.5 9H3.5C3.10218 9 2.72064 8.84196 2.43934 8.56066C2.15804 8.27936 2 7.89782 2 7.5V3.5C2 3.10218 2.15804 2.72064 2.43934 2.43934C2.72064 2.15804 3.10218 2 3.5 2H7.5ZM16.5 2C16.8978 2 17.2794 2.15804 17.5607 2.43934C17.842 2.72064 18 3.10218 18 3.5V7.5C18 7.89782 17.842 8.27936 17.5607 8.56066C17.2794 8.84196 16.8978 9 16.5 9H12.5C12.1022 9 11.7206 8.84196 11.4393 8.56066C11.158 8.27936 11 7.89782 11 7.5V3.5C11 3.10218 11.158 2.72064 11.4393 2.43934C11.7206 2.15804 12.1022 2 12.5 2H16.5ZM7.5 3H3.5C3.36739 3 3.24021 3.05268 3.14645 3.14645C3.05268 3.24021 3 3.36739 3 3.5V7.5C3 7.63261 3.05268 7.75979 3.14645 7.85355C3.24021 7.94732 3.36739 8 3.5 8H7.5C7.63261 8 7.75979 7.94732 7.85355 7.85355C7.94732 7.75979 8 7.63261 8 7.5V3.5C8 3.36739 7.94732 3.24021 7.85355 3.14645C7.75979 3.05268 7.63261 3 7.5 3ZM16.5 3H12.5C12.3674 3 12.2402 3.05268 12.1464 3.14645C12.0527 3.24021 12 3.36739 12 3.5V7.5C12 7.63261 12.0527 7.75979 12.1464 7.85355C12.2402 7.94732 12.3674 8 12.5 8H16.5C16.6326 8 16.7598 7.94732 16.8536 7.85355C16.9473 7.75979 17 7.63261 17 7.5V3.5C17 3.36739 16.9473 3.24021 16.8536 3.14645C16.7598 3.05268 16.6326 3 16.5 3Z"
                    fill="#080808"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
      {diaries.data && (
        <div className="">
          {form === 'calendar' ? (
            <div>
              <Calendar
                isCalendar={form === 'calendar'}
                handleInputDate={handleInputDate}
                diaryList={diaries.data}
                month={date}
                onMonthChange={setDate}
              />
            </div>
          ) : (
            <Cards
              isCalendar={form === 'calendar'}
              handleInputDate={handleInputDate}
              diaryList={diaries.data}
              date={date}
              setDate={setDate}
              isNeedNew={isNeedNew}
              todayYYMM={todayYYMM}
            />
          )}
        </div>
      )}
      <div className="flex justify-end space-x-3">
        <Button
          size="mdFix"
          priority="secondary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path
                d="M4.79993 12.9C4.79993 13.0061 4.84208 13.1078 4.91709 13.1828C4.99211 13.2578 5.09385 13.3 5.19993 13.3H8.79993C10.1087 13.3 11.1199 12.8056 11.7991 12.0408C12.4719 11.2832 12.7999 10.2856 12.7999 9.29999C12.7999 8.31439 12.4719 7.31599 11.7991 6.55919C11.1191 5.79439 10.1087 5.29999 8.79993 5.29999H4.56553L6.68313 3.18319C6.72032 3.146 6.74983 3.10184 6.76995 3.05325C6.79008 3.00466 6.80044 2.95258 6.80044 2.89999C6.80044 2.84739 6.79008 2.79531 6.76995 2.74672C6.74983 2.69813 6.72032 2.65398 6.68313 2.61679C6.64594 2.5796 6.60179 2.5501 6.5532 2.52997C6.50461 2.50984 6.45253 2.49948 6.39993 2.49948C6.34734 2.49948 6.29526 2.50984 6.24667 2.52997C6.19808 2.5501 6.15392 2.5796 6.11673 2.61679L3.31673 5.41679C3.27948 5.45394 3.24993 5.49808 3.22976 5.54668C3.2096 5.59528 3.19922 5.64737 3.19922 5.69999C3.19922 5.7526 3.2096 5.8047 3.22976 5.85329C3.24993 5.90189 3.27948 5.94603 3.31673 5.98319L6.11673 8.78319C6.19184 8.8583 6.29371 8.90049 6.39993 8.90049C6.50615 8.90049 6.60802 8.8583 6.68313 8.78319C6.75824 8.70808 6.80044 8.60621 6.80044 8.49999C6.80044 8.39377 6.75824 8.2919 6.68313 8.21679L4.56553 6.09999H8.79993C9.89113 6.09999 10.6799 6.50559 11.2007 7.09039C11.7279 7.68399 11.9999 8.48559 11.9999 9.29999C11.9999 10.1144 11.7279 10.916 11.2007 11.5096C10.6807 12.0944 9.89113 12.5 8.79993 12.5H5.19993C5.09385 12.5 4.99211 12.5421 4.91709 12.6171C4.84208 12.6922 4.79993 12.7939 4.79993 12.9Z"
                fill="#25B18C"
              />
            </svg>
          }
          onClick={() => {
            setDate(today);
          }}
        >
          오늘로 돌아가기
        </Button>
        <Button
          size="smFix"
          priority="primary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.64589 4.14699C7.73953 4.05312 7.8666 4.00028 7.99919 4.00009C8.13177 3.9999 8.259 4.05238 8.35289 4.14599L13.8369 9.61099C13.8881 9.66208 13.9288 9.72278 13.9566 9.78962C13.9843 9.85646 13.9986 9.92812 13.9986 10.0005C13.9986 10.0729 13.9843 10.1445 13.9566 10.2113C13.9288 10.2782 13.8881 10.3389 13.8369 10.39L8.35289 15.855C8.25847 15.9459 8.13209 15.9962 8.00099 15.9948C7.86989 15.9935 7.74455 15.9408 7.65197 15.8479C7.5594 15.7551 7.50699 15.6296 7.50604 15.4985C7.50509 15.3674 7.55567 15.2412 7.64689 15.147L12.8119 9.99999L7.64689 4.85399C7.55303 4.76035 7.50019 4.63327 7.5 4.50069C7.49981 4.36811 7.55229 4.24088 7.64589 4.14699Z"
                fill="white"
              />
            </svg>
          }
          href={'/emotion-test'}
        >
          나의 감정 확인하기
        </Button>
      </div>
    </div>
  );
};

export default MainSection;
