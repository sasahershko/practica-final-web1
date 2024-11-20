'use client'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button, User} from '@nextui-org/react';
import Link from 'next/link';

export default function NavBar(){
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() =>{
        const token = localStorage.getItem('jwt');

        if(token){
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = ()=>{
        // localStorage.removeItem('jwt');
        localStorage.clear();
        setIsAuthenticated(false);
        router.push('/');
    };

    return(
        <nav>
            <div className='container mx-auto flex justify-between items-center w-full'>
                <div className='flex gap-4'>
                    <Link className='text-black font-bold text-4xl' href='/'>
                        MyApp
                    </Link>
                    <Button className='nav-button' onClick={()=> router.push('../pages/dashboard')}>
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
                        <Button className='bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out'>
                            Logout
                        </Button>
                    </div>
                ): (
                <div className='flex gap-4 mt-3'>
                    <Button 
                        className='nav-button'
                        onClick={()=> router.push('../pages/login')}
                    >
                        Log in
                    </Button>

                    <Button 
                        className='nav-button' 
                        onClick={()=>router.push('../pages/signup')}
                    >
                        Sign up
                    </Button>
                </div>)}

            </div>
        </nav>
    )
}
