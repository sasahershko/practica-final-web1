import { cookies } from 'next/headers';

const EXTERNAL_API_BASE_URL = 'https://bildy-rpmaya.koyeb.app/api/client';

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('bytoken')?.value;

        if (!token) {
            return new Response(
                JSON.stringify({ success: false, message: 'No autorizado, no se encontró token' }),
                { status: 401 }
            );
        }

        // Parsear el cuerpo de la solicitud
        const formData = await request.json();

        // Validar datos (opcional, dependiendo de tu lógica de negocio)
        if (!formData || Object.keys(formData).length === 0) {
            return new Response(
                JSON.stringify({ success: false, message: 'Datos del cliente no proporcionados' }),
                { status: 400 }
            );
        }

        // Realizar la solicitud al backend externo
        const response = await fetch(EXTERNAL_API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        // Manejo de errores en la respuesta del backend externo
        if (!response.ok) {
            const errorData = await response.json();
            return new Response(
                JSON.stringify({
                    success: false,
                    message: errorData.message || 'Error en el servidor externo',
                }),
                { status: response.status }
            );
        }

        // Respuesta exitosa
        const data = await response.json();
        return new Response(
            JSON.stringify({ success: true, data, message: 'Cliente añadido correctamente' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error interno del servidor:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Error interno del servidor' }),
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('bytoken')?.value;

        if (!token) {
            return new Response(
                JSON.stringify({ success: false, message: 'No autorizado, no se encontró token' }),
                { status: 401 }
            );
        }

        // Realizar la solicitud al backend externo
        const response = await fetch(EXTERNAL_API_BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // Manejo de errores en la respuesta del backend externo
        if (!response.ok) {
            const errorData = await response.json();
            return new Response(
                JSON.stringify({
                    success: false,
                    message: errorData.message || 'Error en el servidor externo',
                }),
                { status: response.status }
            );
        }

        // Respuesta exitosa
        const data = await response.json();
        return new Response(
            JSON.stringify({ success: true, data, message: 'Clientes obtenidos correctamente' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error interno del servidor:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Error interno del servidor' }),
            { status: 500 }
        );
    }
}
