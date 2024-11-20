'use client'
import {useRouter} from 'next/navigation';
import useAuthProtection from '../useAuthProtection';
import SideBar from '../../components/SideBar';
import { useEffect } from 'react';

export default function Dashboard(){
    const {hasToken, loading} = useAuthProtection();
    const router = useRouter();

    if(!hasToken && !loading){
        router.push('/pages/login');
        return null;
    }

    if(loading){
        return(
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
            </div>
        )
    }

    return(
        <div>
            <h1 className='text-black text-center text-[100px] font-bold animate-fade-in-up'>DASHBOARD</h1>
            <SideBar/>
        </div>
    )
}