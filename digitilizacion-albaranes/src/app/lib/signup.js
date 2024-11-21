'use server'
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

async function createUser(formData){
    console.log(JSON.stringify(formData));

    try{
        // const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user/register`;
        const url = 'https://bildy-rpmaya.koyeb.app/api/user/register';

        const response = await fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': formData.email,
                'password': formData.password,
            })
        });

        console.log('Estado de la respuesta:', response.status);

        const responseBody = await response.text(); // Captura el texto completo de la respuesta
        console.log('Cuerpo de la respuesta:', responseBody);

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: ${responseBody}`);
        }


        const data = JSON.parse(responseBody);
        console.log('Respuesta exitosa del servidor:', data);
        return data;
    }catch(error){
        console.log(error.message);
        throw new Error('Failed to create user');
    }
}

export async function register(formData){
    try{
        const user = await createUser(formData);

        if (!user || !user.token) {
            console.error('El servidor no devolvió un token:', user);
            throw new Error('El registro fue exitoso, pero no se recibió un token.');
        }

        if(user && user.token){
            cookies().set('bytoken', user.token,{
                path:'/', //disponible en toda la app
                httpOnly: false, //más seguro, no accesible desde JS del cliente - LO HE CAMBIADO A FALSE PARA PODER ACCEDER DESDE EL CLIENTE
                // sameSite: 'strict', //solo se envía en peticiones del mismo sitio
            });

            return {success: true};
        }

    }catch(error){
        throw new Error(error.message);
        return {success: false, message: error.message};
    }
}