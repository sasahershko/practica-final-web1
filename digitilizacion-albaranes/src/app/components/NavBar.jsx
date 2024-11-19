'use client'
import {useRouter} from 'next/navigation';
import {Button} from '@nextui-org/react';
import Link from 'next/link';

export default function NavBar(){
    const router = useRouter();

    return(
        <nav>
            <div className='container mx-auto flex justify-between items-center'>
                <Link className='text-black font-bold text-4xl' href='/'>
                    MyApp
                </Link>

                {/* ESPACIADOR */}
                {/* <div className='flex flex-grow'>a</div> */}

                <div className='flex gap-4 mt-3'>
                    <Button 
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-300 transition duration-300 ease-in-out'
                        onClick={()=> router.push('../pages/login')}
                    >
                        Log in
                    </Button>

                    <Button 
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-300 transition duration-300 ease-in-out' 
                        onClick={()=>router.push('../pages/signup')}
                    >
                        Sign up
                    </Button>
                </div>
            </div>
        </nav>
    )
}
