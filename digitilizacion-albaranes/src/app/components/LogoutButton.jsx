'use client'
import {Button} from '@nextui-org/react';
import {logout} from '../lib/logout';

export default function LogoutButton(){

    const handleLogout = async() =>{
        try{
            await logout();
            console.log('hecho');
        }catch(error){
            console.log(error.message);
        }
    }

    return(
        <>
            <Button className='bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out' onClick={handleLogout}>
            Logout
            </Button>
        </>

    )
}