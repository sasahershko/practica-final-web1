'use client'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button, User} from '@nextui-org/react';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';

export default function NavBar(){
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() =>{
        const cookies = document.cookie.split('; ').find(row => row.startsWith('bytoken='));
        const isLoggedInCookie = document.cookie.split('; ').find(row => row.startsWith('isLoggedIn='));

        const isLoggedIn = isLoggedInCookie?.split('=')[1] === 'true';
        const hasCookies = !!cookies;

        setIsAuthenticated(hasCookies && isLoggedIn);

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
                        <Button className='nav-button' onClick={()=> router.push('/pages/sideBar/summary')}>
                                    Dashboard
                                </Button>
                    </div>

                    {isAuthenticated ? (
                        <div className='flex gap-4 mt-3'>
                            <User 
                                name='Sasa Lara'
                                avatarProps={{
                                    src: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg'
                                }}
                                className='text-black'/>
                            <LogoutButton/>
                        </div>
                    ): (
                    <div className='flex gap-4 mt-3'>
                        <Button 
                            className='nav-button'
                            onClick={()=> router.push('/pages/login')}
                        >
                            Log in
                        </Button>

                        <Button 
                            className='nav-button' 
                            onClick={()=>router.push('/pages/signup')}
                        >
                            Sign up
                        </Button>

                        <Button 
                            className='nav-button' 
                            onClick={probarCookies}
                        >
                            COMPROBAR
                        </Button>
                    
                    </div>)}

                </div>
            </nav>
        </>
    )
}
