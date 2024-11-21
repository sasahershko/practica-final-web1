'use client'
import {useRouter} from 'next/navigation';
import useAuthProtection from '../../../hooks/useAuthProtection';

export default function Dashboard(){
    const {hasToken, loading} = useAuthProtection();
    const router = useRouter();

    if(!hasToken && !loading){
        router.push('/pages/login');
        return null;
    }
    else{
        router.push('/pages/sideBar/summary');
        return null;
    }
}