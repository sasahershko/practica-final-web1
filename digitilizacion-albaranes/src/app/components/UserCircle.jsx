import { useEffect, useState } from 'react';
import { logout } from '../lib/logout';
import Link from 'next/link';

export default function UserCircle() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const toggleUserMenu = (e) => {
        e.stopPropagation();
        setUserMenuOpen(!userMenuOpen);
    };

    const closeUserMenu = () => {
        setUserMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (userMenuOpen) {
            document.addEventListener('click', closeUserMenu);
        } else {
            document.removeEventListener('click', closeUserMenu);
        }
        return () => document.removeEventListener('click', closeUserMenu);
    }, [userMenuOpen]);

    return (
        <div className='flex gap-4 mt-3'>
            <div className="relative">
                <button
                    onClick={(e) => toggleUserMenu(e)}
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
                        href="/pages/dashboard/profile"
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
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}
