'use server';
import { cookies } from 'next/headers';

async function validate(formData) {
    try {
        if (!formData?.email || !formData?.password) {
            throw new Error('Faltan campos obligatorios: email o password.');
        }

        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        });

        const responseBody = await response.text(); //captura el texto completo de la respuesta
        console.log('Cuerpo de la respuesta:', responseBody);

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: ${responseBody}`);
        }

        const data = JSON.parse(responseBody);
        console.log('Usuario autenticado. Respuesta del servidor:', data);

        return { success: true, data: data };
    } catch (error) {
        console.error('Error en validate:', error.message);
        return { success: false, message: error.message };
    }
}

export async function login(formData) {
    try {
        const user = await validate(formData);
        const cookieStorage = await cookies();

        if (!user || !user.data?.token) {
            console.error('El servidor no devolvió un token:', user);
            throw new Error('El inicio de sesión fue exitoso, pero no se recibió un token.');
        }

        cookieStorage.set('bytoken', user.data.token, {
            path: '/', //toda la app
            httpOnly: false, 
        });

        cookieStorage.set('isLoggedIn', 'true', {
            path: '/',
            httpOnly: false, 
        });

        console.log('Cookies configuradas correctamente');
        return { success: true };
    } catch (error) {
        console.error('Error en login:', error.message);
        throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
}
