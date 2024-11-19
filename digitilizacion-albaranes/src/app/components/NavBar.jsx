import Link from 'next/link';

export default function NavBar(){
    return(
        <div className='container mx-auto flex justify-between items-center'>
            <div className='flex space-x-7'>
                <Link href='../pages/login' className='text-white hover:text-gray-300 transition duration-300 ease-in-out'>
                    Login
                </Link>

                <Link href='../pages/register' className='text-white hover:text-gray-300 transition duration-300 ease-in-out'>
                    Register
                </Link>
            </div>
        </div>
    )
}