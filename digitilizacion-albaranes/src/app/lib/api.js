'use server';
import { cookies } from 'next/headers';

const BASE_URL = 'https://bildy-rpmaya.koyeb.app/api';

export async function apiRequest(endpoint, method = 'GET', body = null) {
    const cookieStore = await cookies();
    const token = cookieStore.get('bytoken')?.value;

    if (!token) {
        return {
            success: false,
            message: 'Unauthorized: No token found',
            status: 401,
        };
    }

    try {

        console.log('Datos enviados al servidor:', {
            endpoint,
            method,
            body,
        });

        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : null,
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Error en la solicitud',
                status: response.status,
            };
        }

        return {
            success: true,
            data: result,
            status: response.status,
        };
    } catch (error) {
        console.error('Error interno del servidor:', error);
        return {
            success: false,
            message: 'Error interno del servidor',
            status: 500,
        };
    }
}
