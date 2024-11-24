import {cookies} from 'next/headers';

export async function GET(request) {

    const token = (await cookies()).get('bytoken')?.value;

    if(!token){
        return new Response(JSON.stringify({ success: false, message: 'No autorizado, no se encontró token' }), { status: 401});
    }

    try{
        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.ok){
            const errorData = await response.json();
            return new Response(
                JSON.stringify({success:false, message: errorData.message || 'Error en el servidor externo'}, {status: response.status})
            );
        }

        const data = await response.json();
        return new Response(JSON.stringify({success:true, data: data, message: 'Cliente añadido corre'}), {status: 200});

    }catch(error){
        return new Response(JSON.stringify({success:false, message: 'Error interno del servidor'}) || {status: 500})
    }
}
