'use client';

import { useToast } from '@/providers/toast.context';
import { InputStateType } from '@/types/input.type';
import { clearLocalDiaries } from '@/utils/diaryLocalStorage';
import { createClient } from '@/utils/supabase/client';
import { loginZustandStore } from '@/zustand/zustandStore';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import SignUpModal from '../signUp/SignUpModal';
import KeyIcon from './assets/KeyIcon';
import SignUpIcon from './assets/SignUpIcon';
import Vector from './assets/Vector';

const LogInForm = () => {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailState, setEmailState] = useState<InputStateType>('default');
  const [passwordState, setPasswordState] = useState<InputStateType>('default');

  const setIsLogin = loginZustandStore((state) => state.setIsLogin);
  const publicSetProfileImg = loginZustandStore((state) => state.publicSetProfileImg);

  const supabase = createClient();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleClickLogIn = async (): Promise<void> => {
    if (!email || !password) return toast.on({ label: '이메일과 비밀번호를 작성해주세요.' });

    const data = { email, password };
    try {
      const response = await axios.post('/api/auth/log-in', data);
      if (response.status === 200) {
        setEmail('');
        setPassword('');
        setIsLogin(true);

        const { data: userData } = await supabase.auth.getUser();
        if (userData && userData.user) {
          const userId = userData.user?.id;
          const { data } = await supabase.from('users').select('profileImg, nickname').eq('id', userId).single();
          if (data && data?.profileImg) {
            publicSetProfileImg(data?.profileImg);
          }
          if (data?.nickname) {
            toast.on({ label: `${data.nickname}님 안녕하세요. 만나서 반가워요!` });
          }
        }

        clearLocalDiaries();

        router.replace('/');
      }
    } catch (error) {
      console.error(error);
      toast.on({ label: '올바른 이메일과 비밀번호를 입력해주세요' });
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = e.target.value;

    setEmail(newEmail);
    setEmailState(() => {
      if (newEmail === '') return 'default';
      else {
        if (!validateEmail(newEmail)) return 'error';
        else return 'filled';
      }
    });
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;

    setPassword(newPassword);
    setPasswordState(() => {
      if (newPassword === '') return 'default';
      else {
        if (!validatePassword(newPassword)) return 'error';
        else return 'filled';
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full md:w-744px-row inline-flex flex-col justify-center items-center rounded-5xl md:border-4 md:border-border-color bg-layout md:bg-white px-20px-row-m md:px-96px-row md:py-72px-col gap-40px-col-m md:gap-48px-col">
        <h1 className="text-font-color font-bold md:text-24px md:tracking-0.48px text-18px-m tracking-0.36px">
          로그인
        </h1>
        <div className="w-full flex flex-col items-center md:gap-72px-col gap-56px-col-m">
          <div className="flex flex-col items-start md:gap-48px-col gap-32px-col-m self-stretch">
            <div className="w-full flex flex-col items-start md:gap-24px-col gap-16px-col-m self-stretch">
              <Input
                id="email"
                type="email"
                state={emailState}
                value={email}
                setValue={setEmail}
                onChange={handleChangeEmail}
                label="이메일"
                placeholder="이메일을 입력해주세요."
              />
              <Input
                id="password"
                type="password"
                state={passwordState}
                value={password}
                setValue={setPassword}
                onChange={handleChangePassword}
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
            <div className="w-full flex justify-center items-center md:gap-16px-row gap-12px-row-m self-stretch">
              <Button size={'half'} icon={<KeyIcon />} onClick={handleClickLogIn}>
                로그인 하기
              </Button>
              <span className="flex items-center justify-center w-6 h-6 md:w-24px-row md:h-24px-row">
                <Vector />
              </span>
              <Button size={'half'} icon={<SignUpIcon />} priority="secondary" onClick={() => setIsModalVisible(true)}>
                회원가입 하기
              </Button>
            </div>
          </div>
          <div className="flex items-start md:gap-32px-row gap-24px-row-m">
            <div className="flex justify-center">
              <div className="relative aspect-square w-11 h-11 md:w-44px-row md:h-44px-row rounded-full flex justify-center items-center">
                <Image src="/Apple.png" alt="Apple" fill className="object-fit" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative aspect-square w-11 h-11 md:w-44px-row md:h-44px-row rounded-full flex justify-center items-center">
                <Image src="/Google.png" alt="Google" fill className="object-fit" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative aspect-square w-11 h-11 md:w-44px-row md:h-44px-row rounded-full flex justify-center items-center">
                <Image src="/Kakao.png" alt="Kakao" fill className="object-fit" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative aspect-square w-11 h-11 md:w-44px-row md:h-44px-row rounded-full flex justify-center items-center">
                <Image src="/Naver.png" alt="Naver" fill className="object-fit" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignUpModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </div>
  );
};

export default LogInForm;
