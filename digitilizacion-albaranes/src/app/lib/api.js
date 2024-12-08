// 'use server';
// import { cookies } from 'next/headers';

// const BASE_URL = 'https://bildy-rpmaya.koyeb.app/api';

// export async function apiRequest(endpoint, method = 'GET', body = null, isBlob = false) {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('bytoken')?.value;

//     if (!token) {
//         return {
//             success: false,
//             message: 'Unauthorized: No token found',
//             status: 401,
//         };
//     }

//     try {
//         console.log('Datos enviados al servidor:', {
//             endpoint,
//             method,
//             body,
//         });

//         // Configuración de la solicitud
//         const requestOptions = {
//             method,
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 ...(body instanceof FormData || isBlob ? {} : { 'Content-Type': 'application/json' }), // No incluir Content-Type si es FormData o blob
//             },
//             body: body instanceof FormData || isBlob ? body : body ? JSON.stringify(body) : null, //no serializar si es FormData o blob
//         };

//         const response = await fetch(`${BASE_URL}/${endpoint}`, requestOptions);

//         //manejo de respuesta si es un blob
//         if (isBlob) {
//             if (!response.ok) {
//                 throw new Error('Error en la solicitud');
//             }
//             const blob = await response.blob();
//             return { success: true, data: blob, status: response.status };
//         }

//         const result = await response.json();

//         if (!response.ok) {
//             return {
//                 success: false,
//                 message: result.message || 'Error en la solicitud',
//                 status: response.status,
//             };
//         }

//         return {
//             success: true,
//             data: result,
//             status: response.status,
//         };
//     } catch (error) {
//         console.error('Error interno del servidor:', error);
//         return {
//             success: false,
//             message: 'Error interno del servidor',
//             status: 500,
//         };
//     }
// }
'use server';
import { cookies } from 'next/headers';

export async function apiRequest(endpoint, method = 'GET', body = null, isBlob = false) {
    const cookieStore = await cookies();
    const token = cookieStore.get('bytoken')?.value;

    if (!token && endpoint !== 'user/login' && endpoint !== 'user/register') {
        return { success: false, message: 'Unauthorized: No token found', status: 401 };
    }

    try {
        const requestOptions = {
            method,
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(body instanceof FormData || isBlob ? {} : { 'Content-Type': 'application/json' }),
            },
            body: body instanceof FormData || isBlob ? body : body ? JSON.stringify(body) : null,
        };

        const response = await fetch(`${BASE_URL}/${endpoint}`, requestOptions);

        if (isBlob) {
            if (!response.ok) throw new Error('Error en la solicitud');
            const blob = await response.blob();
            return { success: true, data: blob, status: response.status };
        }

        const result = await response.json();
        if (!response.ok) {
            return { success: false, message: result.message || 'Error en la solicitud', status: response.status };
        }

        return { success: true, data: result, status: response.status };
    } catch (error) {
        console.error('Error interno del servidor:', error);
        return { success: false, message: 'Error interno del servidor', status: 500 };
    }
}