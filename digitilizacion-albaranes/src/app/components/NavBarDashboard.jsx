'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchBar from './SearchBar';
import {logout} from '../lib/logout';

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

    const handleLogout = async() =>{
        try{
            await logout();
        }catch(error){
            console.log(error.message);
        }
    }


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

                    {isAuthenticated ? (
                        <div className='flex gap-4 mt-3'>
                            <div className="relative">
   
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); //evita que el evento cierre al momento
                                        setUserMenuOpen((prev) => !prev); 
                                        if (!userMenuOpen) {
                                            document.addEventListener(
                                                'click',
                                                () => setUserMenuOpen(false),
                                                { once: true } //cierra con un clic fuera, solo una vez
                                            );
                                        }
                                    }}
                                    className="relative z-auto w-10 h-10 rounded-full overflow-hidden focus:outline-none ring-2 ring-blue-500 transform transition-transform duration-200 hover:scale-105"
                                    aria-label="User menu"
                                >
                                    <img
                                        src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg"
                                        alt="Avatar"
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                                <p className='text-black'>User</p>

                                <div
                                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 transform transition-all duration-300 origin-top-right ${userMenuOpen
                                        ? 'scale-100 opacity-100 translate-y-0'
                                        : 'scale-95 opacity-0 -translate-y-2 pointer-events-none'
                                        }`}
                                >
                                    <Link
                                        href="/"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/pages/dashboard/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        Settings
                                    </Link>
                                    <Link
                                        href="/"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 rounded-sm hover:text-white transition duration-150"
                                        onClick={() =>{handleLogout()}}
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        null
                    )}

                </div>
            </nav>
        </>
    )
}
