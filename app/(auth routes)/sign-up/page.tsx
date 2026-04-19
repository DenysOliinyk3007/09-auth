'use client'

import SignUpPage from "@/components/SignUpPage/SignUpPage";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore'
import { ApiError } from '@/app/api/api'
import { RegisterRequest, register } from "@/lib/api/clientApi";



const SignUp = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const setUser = useAuthStore((state) => state.setUser)

    const handleSubmit = async (formData: FormData) => {
        try {

            const formValues = Object.fromEntries(formData) as RegisterRequest;

            const res = await register(formValues);

            if (res) {
                setUser(res)
                router.push('/profile');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError(
                (error as ApiError).response?.data?.error ??
                (error as ApiError).message ??
                'Oops... some error'
            )
        }
    }
    return (
        <>
            <SignUpPage handleSubmit={handleSubmit} error = {error}/>
        </>

    )

};



export default SignUp;