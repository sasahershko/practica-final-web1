'use client'
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'; 

export default function useAuthProtection(){

    const router = useRouter();
    const [hasToken, setHasToken] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const token = localStorage.getItem('jwt');
        if(!token){
            // router.push('/');
            setHasToken(false);
        }else{
            setHasToken(true);
        }
        setLoading(false);
    }, []);

    return {hasToken, loading};
}