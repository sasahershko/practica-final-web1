'use server';
import {apiRequest} from './api';
import {cookies} from 'next/headers';

export async function login(values) {
    const { email, password } = values;

    const response = await apiRequest('user/login', 'POST', { email, password });
    if (response.success) {
        const cookieStore = await cookies();
        cookieStore.set('bytoken', response.data.token, { path: '/', httpOnly: false });
        cookieStore.set('isLoggedIn', 'true', { path: '/', httpOnly: false });
    }
    return response;
}


export async function register(values) {
    const { email, password } = values;

    console.log('Datos enviados al registro:', { email, password });

    const response = await apiRequest('user/register', 'POST', { email, password });

    console.log('RESPUESTA=========>', response);

    if (response.success) {
        const cookieStore = await cookies();
        cookieStore.set('bytoken', response.data.token, { path: '/', httpOnly: false });
    }

    return response;
}

export async function verify(codeValue) {
    try {
        const response = await apiRequest('user/validation', 'PUT', { code: codeValue });

        if (!response.success) {
            throw new Error(response.message || 'Error al validar la cuenta.');
        }

        const cookieStorage = await cookies();
        cookieStorage.set('isLoggedIn', 'true', {
            path: '/',
            httpOnly: false, 
        });

        return response;
    } catch (error) {
        console.error('Error en verify:', error.message);
        return { success: false, message: error.message };
    }
}

export async function deleteUser() {
    try {
        const response = await apiRequest('user', 'DELETE');
        console.log('Response from DELETE /user:', response);

        if (response.success) {
            await logout(); 
        }

        return response;
    } catch (error) {
        console.error('Error deleting user:', error.message);
        return { success: false, message: error.message };
    }
}


export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('bytoken');
    cookieStore.delete('isLoggedIn');

    //esto hace que se espere 100ms antes de redirigir ( para asegurarme de que las cookies se eliminen antes del redireccionamiento)
    await new Promise((resolve) => setTimeout(resolve, 100)); 
}

export async function registrationComplete(values) {
    try{
        const { email, name, surnames, nif } = values;
        const response = await apiRequest('user/register', 'PUT', { email, name, surnames, nif });
        
        return response;
    }catch(error){
        return {success: false, message: error.message};
    }
}

export async function getUserData() {
    try{
        const response = await apiRequest('user');

        return response;
    }catch(error){
        return {success: false, message: error.message};
    }
}

export async function changePassword(newPassword) {
    return apiRequest('user/password', 'PATCH', { password: newPassword });
}