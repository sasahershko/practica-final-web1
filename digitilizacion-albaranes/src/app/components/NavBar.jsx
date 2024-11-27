'use client'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button, User} from '@nextui-org/react';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';
import UserCircle from '../components/UserCircle';

export default function NavBar(){
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthentication = () =>{
        const cookies = document.cookie.split('; ').find(row => row.startsWith('bytoken='));
        const isLoggedInCookie = document.cookie.split('; ').find(row => row.startsWith('isLoggedIn='));

        const isLoggedIn = isLoggedInCookie?.split('=')[1] === 'true';
        const hasCookies = !!cookies;

        return hasCookies && isLoggedIn;
    }

    useEffect(() =>{
        const updateAuthState = () =>{
            setIsAuthenticated(checkAuthentication());
        };

        updateAuthState();

        const interval = setInterval(() => {   
            updateAuthState();
        }, 500);

        return () => clearInterval(interval);

    }, []);


    const probarCookies = () =>{
        const cookies = document.cookie.split('; ').find(row => row.startsWith('bytoken='));
        const isLoggedInCookie = document.cookie.split('; ').find(row => row.startsWith('isLoggedIn='));

        const hasCookies = !!cookies;
        const isLoggedIn = isLoggedInCookie?.split('=')[1] === 'true';
       console.log(hasCookies);
       console.log(isLoggedIn);
    }


    return(
        <>
            <nav>
                <div className='container mx-auto flex justify-between items-center w-full'>
                    <div className='flex gap-4 mt-3'>
                        <Link className='text-black font-bold text-4xl' href='/'>
                            MyApp
                        </Link>
                        <Button className='blue-button' onClick={()=> router.push('/pages/dashboard/summary')}>
                            Dashboard
                        </Button>
                    </div>

                    {isAuthenticated ? (
                        <UserCircle/>
                    ): (
                    <div className='flex gap-4 mt-3'>
                        <Button 
                            className='blue-button'
                            onClick={()=> router.push('/pages/login')}
                        >
                            Log in
                        </Button>

                        <Button 
                            className='blue-button' 
                            onClick={()=>router.push('/pages/signup')}
                        >
                            Sign up
                        </Button>
                    </div>)}

                </div>
            </nav>
        </>
    )
}
