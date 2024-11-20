'use client'
import {useEffect} from 'react';
import {useRouter} from 'next/navigation'; 

export default function useAuthProtection(){

    const router = useRouter();

    useEffect(() =>{
        const token = localStorage.getItem('jwt');
        if(!token){
            router.push('/');
        }
    }, [router]);
}