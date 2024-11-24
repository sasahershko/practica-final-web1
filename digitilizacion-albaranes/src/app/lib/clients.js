'use server'
import {cookies} from 'next/headers';

export async function getClient(){

    const token = cookies().get('bytoken')?.value;

    if(!token){
        throw new Error('No se encontró el token de las cookies');
    }

    try{

        const response = await fetch ('https://bildy-rpmaya.koyeb.app/api/client', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            // next: {revalidate:0} //no usar caché, obtener datos en tiempo real
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

export async function addClient(formData){

    const token = cookies().get('bytoken')?.value;

    if(!token){
        throw new Error('No se encontró el token de las cookies');
    }

    try{
        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: formData.name,
                cif: formData.cif,
                address:{
                    street: formData.street,
                    number: formData.number,
                    postal: formData.postal,
                    city: formData.city,
                    province: formData.province,
                }
            })
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