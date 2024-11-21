import {cookies} from 'next/headers';

async function getUser(creds){
    try{
        const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies
            }
        });

        return response.json();
    }catch(e){
        console.log(e.message);
    }
}