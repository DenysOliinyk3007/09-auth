'use client';

// Додаємо імпорти
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from "@/lib/api/clientApi";
import SignInPage from "@/components/SignInPage/SignInPage"
import { useAuthStore } from '@/lib/store/authStore' 

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser)
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest
      const res = await login(formValues)
      if (res) {
        setUser(res)
        router.push('/profile')
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignInPage handleSubmit={handleSubmit} error={error}/>
  );
};

export default SignIn;