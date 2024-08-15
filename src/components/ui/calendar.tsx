'use client';

import { cn } from '@/lib/utils';
import { useToast } from '@/providers/toast.context';
import { Diary, DiaryList } from '@/types/diary.type';
import { formatFullDate } from '@/utils/dateUtils';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import '../main/dateInput.css';
import Stamp from '../main/Stamp';
import { ko } from 'date-fns/locale';
import CalenderPrevIcon from '../main/assets/CalenderPrevIcon';
import CalenderNextIcon from '../main/assets/CalenderNextIcon';
import LoadingWinter from '../main/assets/LoadingWinter';
import LoadingFall from '../main/assets/LoadingFall';
import LoadingSummer from '../main/assets/LoadingSummer';
import LoadingSpring from '../main/assets/LoadingSpring';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  diaryList: DiaryList;
  isCalendar: boolean;
  isLoading?: boolean;
  handleInputDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  diaryList,
  isCalendar,
  handleInputDate,
  isLoading,
  ...props
}: CalendarProps) {
  const route = useRouter();
  const today = new Date();
  const toast = useToast();
  const searchParams = useSearchParams();

  return (
    <div className="relative">
      <DayPicker
        showOutsideDays={showOutsideDays}
        locale={ko}
        className={cn(className)}
        classNames={{
          months: `${
            isCalendar
              ? 'flex flex-col border-2 md:border-4 border-[--border-color] rounded-[24px] md:rounded-[32px] bg-[#fff]'
              : ''
          }`,
          month: '',
          caption: 'relative flex justify-center items-center',
          caption_label: 'text-sm font-medium',
          nav: 'flex items-center',
          nav_button: cn('h-7 w-7 bg-transparent opacity-50 hover:opacity-100'),
          nav_button_previous: `${
            isCalendar
              ? 'absolute left-70px-row-m top-1.5 md:left-216px-row md:top-4'
              : 'absolute right-90px-row-m md:right-230px-row'
          }`,
          nav_button_next: `${
            isCalendar
              ? 'absolute right-78px-row-m top-1.5 md:right-230px-row md:top-4'
              : 'absolute left-110px-row-m md:left-250px-row'
          }`,
          table: `${
            isCalendar
              ? 'w-full border-collapse flex flex-col items-center md:px-72px-row md:py-24px-col px-16px-row-m py-16px-col-m '
              : 'hidden'
          }`,
          head: 'w-full gap-4 border-b border-[#25B18C]',
          head_row: `grid grid-cols-7 place-items-center py-8px-col-m md:py-16px-col px-16px-row-m md:px-16px-row`,
          head_cell: 'w-8 text-14px-m md:text-18px',
          tbody:
            'mt-2 md:mt-0 grid grid-rows-5 md:w-full gap-4 text-12px md:text-14px md:py-16px-col md:px-16px-row px-16px-row-m',
          row: 'grid grid-cols-7 place-items-center gap-2',
          cell: 'md:w-8',
          day: '',
          day_range_end: 'day-range-end',
          day_selected:
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          day_today: 'text-accent-foreground',
          day_outside:
            'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
          ...classNames
        }}
        components={{
          IconLeft: ({ ...props }) => <CalenderPrevIcon />,
          IconRight: ({ ...props }) => <CalenderNextIcon />,
          CaptionLabel: ({ ...props }) => {
            const dateInputRef = React.useRef<HTMLInputElement>(null);
            const handleRef = () => {
              if (dateInputRef.current) {
                dateInputRef.current.showPicker();
              }
            };
            return (
              <div className="anchor cursor-pointer py-12px-col-m md:py-24px-col">
                <input type="date" ref={dateInputRef} style={{ visibility: 'hidden' }} onChange={handleInputDate} />
                <p onClick={() => handleRef()} className="text-16px-m md:text-24px">
                  {props.displayMonth.getFullYear()}년 {props.displayMonth.getMonth() + 1}월
                </p>
              </div>
            );
          },
          DayContent: ({ ...props }) => {
            let isToday = false;
            if (formatFullDate(String(today)) === formatFullDate(String(props.date))) {
              isToday = true;
            }

            const handleGoWritePage = async () => {
              try {
                const supabase = createClient();
                const {
                  data: { session },
                  error
                } = await supabase.auth.getSession();

                if (error) {
                  throw new Error(error.message);
                }
                if (!session) {
                  if (2 <= diaryList.length) {
                    toast.on({ label: '비회원은 2개이상 작성할 수 없습니다.' });
                  } else if (today < props.date) {
                    toast.on({ label: '미래의 일기는 작성하실 수 없습니다.' });
                  } else {
                    route.push(
                      `/diaries/write/${formatFullDate(String(props.date))}?form=calendar&YYMM=${searchParams.get(
                        'YYMM'
                      )}`
                    );
                  }
                } else {
                  if (today < props.date) {
                    toast.on({ label: '미래의 일기는 작성하실 수 없습니다.' });
                  } else {
                    route.push(
                      `/diaries/write/${formatFullDate(String(props.date))}?form=calendar&YYMM=${searchParams.get(
                        'YYMM'
                      )}`
                    );
                  }
                }
              } catch (error) {
                console.error('Failed to get session:', error);
              }
            };

            const handleFindDiary = (diary: Diary) => {
              if (formatFullDate(String(diary.date)) === formatFullDate(String(props.date))) {
                return true;
              } else {
                return false;
              }
            };
            const [diaries, setDiaries] = React.useState<Diary>();

            React.useEffect(() => {
              if (!isCalendar) {
                return;
              } else {
                setDiaries(diaryList.find(handleFindDiary));
              }
            }, []);

            return diaries ? (
              <div
                onClick={() => {
                  route.push(`/diaries/${diaries.diaryId}?form=calendar&YYMM=${searchParams.get('YYMM')}`);
                }}
                className="flex flex-col items-center cursor-pointer"
              >
                <Stamp petal={diaries.color} circle="#F7CA87" month={props.date.getMonth() + 1} />
                <p className="text-12px-m md:text-14px">{props.date.getDate()}</p>
              </div>
            ) : (
              <div
                onClick={() => {
                  handleGoWritePage();
                }}
                className="flex flex-col items-center cursor-pointer"
              >
                <Stamp petal="#FFF" circle="#D4D4D4" month={props.date.getMonth() + 1} isToday={isToday} />
                <p className="text-12px-m md:text-14px mt-1">{props.date.getDate()}</p>
              </div>
            );
          }
        }}
        {...props}
      />
      {isCalendar && isLoading && (
        <div className="absolute bg-[#fff] w-4/5 h-[74%] top-102px-col-m left-32px-row-m md:w-4/5 md:h-2/3 md:top-170px-col md:left-70px-row flex flex-col justify-center items-center">
          <div className="loading flex space-x-16px-row-m md:space-x-16px-row">
            <div className="w-32px-row-m md:w-40px-row delay-200 animate-[jump_1s_ease-in-out_infinite]">
              <LoadingSpring />
            </div>
            <div className="w-32px-row-m md:w-40px-row delay-500 animate-[jump_1s_ease-in-out_infinite]">
              <LoadingSummer />
            </div>
            <div className="w-32px-row-m md:w-40px-row delay-700 animate-[jump_1s_ease-in-out_infinite]">
              <LoadingFall />
            </div>
            <div className="w-32px-row-m md:w-40px-row delay-1000 animate-[jump_1s_ease-in-out_infinite]">
              <LoadingWinter />
            </div>
          </div>
          <p className="text-14px-m md:text-20px mt-24px-col-m md:mt-24px-col">
            계절을 불러오고 있어요. 잠시만 기다려주세요.
          </p>
        </div>
      )}
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
