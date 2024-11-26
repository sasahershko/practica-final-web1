import {cookies} from 'next/headers'

export async function PUT(request, {params}){
    const {id} = params;
    const token = cookies().get('bytoken')?.value;

    if(!token){
        return new Response(JSON.stringify({success: false, message: 'No autorizado, no se encontró token'}), {status: 401});
    }

    try{

        const values = await request.json(); //se extrae de la solicitud PUT del frontend

        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${id}`, { 
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        })

        if(!response.ok){
            return new Response(JSON.stringify({success: false, message: result.message}), {status: response.status});
        }

        const result = await response.json();
        return new Response(JSON.stringify({success: true, data:result}), {status: 200});
    }catch(error){
        console.log('Error al actualizar el cliente.', error.message);
        return new Response(JSON.stringify({success: false, message: 'Error interno del servidor'}), {status: 500});
    }
}