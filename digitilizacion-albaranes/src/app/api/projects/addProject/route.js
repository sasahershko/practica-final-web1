import {cookies} from 'next/navigation';

export async function POST(formData){
    const token = cookies().get('bytoken')?.value;

    if(!token){
        return new Response(JSON.stringify({message: 'Unauthorized'}), {status:401});
    }

    try{
        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            bodyu: JSON.stringify({
                name: formData.name,
                email: formData.email,
                street: formData.street,
                number: formData.number,
                postal: formData.postal,
                city: formData.city,
                province: formData.province,
                code: formData.code,
                clientId: formData.clientId
            })
        });

        if(!response.ok){
            return new Response(JSON.stringify({message: 'Error'}), {status: response.status});
        }

        const result = await response.json();
        return new Response(JSON.stringify({message: 'Success', data: result}), {status: 200});

    }catch(error){
        return new Response(JSON.stringify({message: 'Error'}), {status: 500});
    }
}