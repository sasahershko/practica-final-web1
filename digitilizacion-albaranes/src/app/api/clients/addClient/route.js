import {cookies} from 'next/headers';

const EXTERNAL_API_URL = 'https://bildy-rpmaya.koyeb.app/';

export async function POST (request){
    const cookieStorage = await cookies();
    const token = cookieStorage.get('bytoken')?.value;

    if(!token){
        return new Response(JSON.stringify({ success: false, message: 'No autorizado, no se encontró token' }), { status: 401});
    }

    try{
        const formData = await request.json();

        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: formData.name,
                cif: formData.cif,
                address:{
                    street: formData.street,
                    number: formData.number,
                    postal: formData.postal,
                    city: formData.city,
                    province: formData.province,
                }
            })
        });

        if(!response.ok){
            const errorData = await response.json();
            return new Response(
                JSON.stringify({success:false, message: errorData.message || 'Error en el servidor externo'}, {status: response.status})
            )
        }

        const data = await response.json();
        return new Response(JSON.stringify({success:true, data: data, message: 'Cliente añadido correctamente'}), {status: 200});
    }catch(error){
        return new Response(JSON.stringify({success:false, message: 'Error interno del servidor'}) || {status: 500})
    }
}