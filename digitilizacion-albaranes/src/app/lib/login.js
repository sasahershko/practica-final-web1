'use server'
import {cookies} from 'next/headers';

export async function login (formData){

    try{

        const response = await fetch ('https://bildy-rpmaya.koyeb.app/api/user/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            })
        });

        if(!response.ok){
            throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();

        cookies().set ('bytoken', data.token,{
            path:'/',
            httpOnly: true,
        });


        //GUARDAMOS EL ESTADO DE LA SESIÓN
        cookies.set('isLoggedIn', 'true', {
            path: '/',
            httpOnly: true,
        });

        console.log('Usuario autenticado. Cookies configuradas');
        return {success: true, data:data};
    }catch(error){
        // throw new Error('Credenciales inválidas');
        return {success: false, message: error.message};
    }
}