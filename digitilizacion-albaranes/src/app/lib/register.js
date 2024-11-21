'use server'
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

async function createUser(formData){

    try{
        const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user/register`;
        const response = await fetch(url, {
            methos:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies,
            },
            body: JSON.stringify({
                'email': formData.email,
                'password': formData.password,
            })
        })
        
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error.message);
        throw new Error('Failed to create user');
    }
}

export async function register(formData){
    try{
        const user = await createUser(formData);

        if(user && user.token){
            cookies().set({
                name:'bytoken',
                value: user.token,
                path:'/',
            });
            redirect('/pages/verifyAccount');
        }
        return null;
    }catch(error){
        throw error;
    }
}