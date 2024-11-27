import {cookies} from 'next/headers';

export async function GET (request){
    const token = (await cookies()).get('bytoken')?.value;

    if(!token){
        console.log('no hay token')
        return new Response(JSON.stringify({message: 'Unauthorized'}), {status: 401});
    }

    try{
        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.ok){
            return new Response(JSON.stringify({success:false, message: 'Error'}), {status: response.status});
        }

        const result = await response.json();
        return new Response(JSON.stringify({success: true, data: result}), {status: 200});
    }catch(error){
        return new Response(JSON.stringify({success: false, message: 'Error'}), {status: 500});
    }
}