'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchBar from './SearchBar';
import UserCircle from './UserCircle';

export default function NavBar() {
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const checkAuthentication = () => {
        const cookies = document.cookie.split('; ').find(row => row.startsWith('bytoken='));
        const isLoggedInCookie = document.cookie.split('; ').find(row => row.startsWith('isLoggedIn='));

        const isLoggedIn = isLoggedInCookie?.split('=')[1] === 'true';
        const hasCookies = !!cookies;

        return hasCookies && isLoggedIn;
    }

    useEffect(() => {
        const updateAuthState = () => {
            setIsAuthenticated(checkAuthentication());
        };

        updateAuthState();

        const interval = setInterval(() => {
            updateAuthState();
        }, 500);

        return () => clearInterval(interval);

    }, []);

    return (
        <>
            <nav className='sticky top-0  bg-white shadow-sm  w-full'>
                <div className='container mx-auto flex justify-between items-center h-20'>
                    <div className='flex  gap-4 mt-3'>
                        <Link className='text-black font-bold text-4xl' href='/'>
                            MyApp
                        </Link>
                    </div>

                    <div className='flex-1 flex justify-center'>
                        <SearchBar />
                    </div>

                    {isAuthenticated && (<UserCircle/>)}

                </div>
            </nav>
        </>
    )
}
