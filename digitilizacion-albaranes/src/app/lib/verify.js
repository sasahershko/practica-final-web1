'use server'
import {cookies} from 'next/headers';

export async function verify (codeValue) {

    try{
        //recupero el token desde las cookies del server
        const token = cookies().get('bytoken')?.value;

        if(!token){
            throw new Error('No se encontró el token de las cookies');
        }


        // `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user/validation`
        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/validation', {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({code: codeValue})
        });



        if(!response.ok){
            console.log(`ERROR AL VERIFICAR CUENTA: ${data.message || JSON.stringify(data)}`);
            // throw new Error(errorData.message || 'Error al validar la cuenta.');
            return {success: false, message: errorData.message || 'Error al validar la cuenta.'};
        }

        
        const data = await response.json();
    
        (await cookies()).set('isLoggedIn', 'true', {
            path: '/',
            httpOnly: false,
        });

        return {success: true, data: data};

    }catch(error){
        // alert('ERROR DENTRO DE VERIFY', error.message);
        return {success: false, message: error.message};
    }
}