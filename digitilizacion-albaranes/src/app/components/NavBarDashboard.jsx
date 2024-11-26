'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, user, User } from '@nextui-org/react';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';
import SearchBar from './SearchBar';

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

                    {isAuthenticated ? (
                        <div className='flex gap-4 mt-3'>
                            {/* <User 
                                name='Sasa Lara' 
                                avatarProps={{
                                    src: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg'
                                }}
                                className='text-black'/> */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen((prev) => !prev)}
                                    className="relative z-auto w-10 h-10 rounded-full overflow-hidden focus:outline-none ring-2 ring-blue-500 transform transition-transform duration-200 hover:scale-105"
                                    aria-label="User menu"
                                >
                                    <img
                                        src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg"
                                        alt="Avatar"
                                        className="object-cover w-full h-full"
                                    />
                                </button>

                                <div
                                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 transform transition-all duration-300 origin-top-right ${userMenuOpen
                                            ? 'scale-100 opacity-100 translate-y-0'
                                            : 'scale-95 opacity-0 -translate-y-2 pointer-events-none'
                                        }`}
                                >
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        Settings
                                    </Link>
                                    <Link
                                        href="/logout"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </div>


                            {/* <LogoutButton /> */}
                        </div>
                    ) : (
                        null
                    )}

                </div>
            </nav>
        </>
    )
}
