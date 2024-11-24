'use server'
import {cookies} from 'next/headers';

export async function getClient(){

    const token = cookies.get('bytoken');

    try{

        const response = await fetch ('https://bildy-rpmaya.koyeb.app/api/client', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.ok){
            throw new Error('Error en la petición');
        }

        const data = await response.json();
        return {success: true, data: data}

    }catch(error){
        return {success: false, error: error.message}
    }
}