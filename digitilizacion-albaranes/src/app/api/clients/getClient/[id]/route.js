import {cookies} from 'next/headers'

export async function GET(request, {params}){
    const {id} = params;
    const cookieStorage = await cookies();
    const token = cookieStorage.get('bytoken')?.value;

    if(!token){
        return new Response(JSON.stringify({success: false, message: 'No autorizado, no se encontró token'}), {status: 401});
    }

    try{
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
    
        if(!response.ok){
            const errorData = await response.json();    
            return new Response(JSON.stringify({success: false, message: errorData.message}), {status: response.status});
        }
    
        const data = await response.json();
        return new Response(JSON.stringify({success: true, data: data}), {status:200});
    }catch(error){
        return new Response(JSON.stringify({success: false, message: 'Error interno del servidor'}), {status: 500});
    }   

}
