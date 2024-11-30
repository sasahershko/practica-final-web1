import { cookies } from 'next/headers';

const EXTERNAL_API_BASE_URL = 'https://bildy-rpmaya.koyeb.app/api/client';

export async function GET(request, { params }) {
    const { id } = params;
    const cookieStorage = await cookies();
    const token = cookieStorage.get('bytoken')?.value;

    if (!token) {
        return new Response(
            JSON.stringify({ success: false, message: 'No autorizado, no se encontró token' }),
            { status: 401 }
        );
    }

    try {
        const response = await fetch(`${EXTERNAL_API_BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return new Response(
                JSON.stringify({ success: false, message: errorData.message }),
                { status: response.status }
            );
        }

        const data = await response.json();
        return new Response(JSON.stringify({ success: true, data }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: 'Error interno del servidor' }), { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    const token = cookies().get('bytoken')?.value;

    if (!token) {
        return new Response(
            JSON.stringify({ success: false, message: 'No autorizado, no se encontró token' }),
            { status: 401 }
        );
    }

    try {
        const response = await fetch(`${EXTERNAL_API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return new Response(
                JSON.stringify({ success: false, message: errorData.message }),
                { status: response.status }
            );
        }

        return new Response(JSON.stringify({ success: true, message: 'Cliente eliminado correctamente' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: 'Error interno del servidor' }), { status: 500 });
    }
}
