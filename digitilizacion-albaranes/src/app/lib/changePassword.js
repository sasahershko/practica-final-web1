'use server'
import { cookies } from "next/headers"

export async function changePassword(newPassword){
    const token = cookies().get('bytoken')?.value;

    if(!token){
        throw new Error('No hay token');
    }

    try{
        const response = await fetch ('https://bildy-rpmaya.koyeb.app/api/user/password', {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({
                password: newPassword,
            })
        });
    
        if(!response.ok){
            // throw new Error('Error al cambiar la contraseña');
            console.log('error en el ok');
        }

        const data = await response.json();
        console.log('Contraseña cambiada');
        return {success: true, data: data};
    }catch(error){
        console.log(error.message);
        return {success: false, message: error.message};

    }
}