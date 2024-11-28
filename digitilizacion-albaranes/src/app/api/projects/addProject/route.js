import {cookies} from 'next/headers';

export async function POST(request){
    const token = cookies().get('bytoken')?.value;

    if(!token){
        return new Response(JSON.stringify({message: 'Unauthorized'}), {status:401});
    }

    try{
        const formData = await request.json();
        console.log('FORM DATA:', JSON.stringify({
            name: formData.name,
            projectCode: formData.projectCode,
            email: formData.email,
            address:{
                street: formData.street,
                number: formData.number,
                postal: formData.postal,
                city: formData.city,
                province: formData.province,
            },
            code: formData.code,
            clientId: formData.clientId,
        }));

        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: formData.name,
                projectCode: formData.projectCode,
                email: formData.email,
                address:{
                    street: formData.street,
                    number: formData.number,
                    postal: formData.postal,
                    city: formData.city,
                    province: formData.province,
                },
                code: formData.code,
                clientId: formData.clientId
            })
        });


        if(!response.ok){
            return new Response(JSON.stringify({success: false, message: 'Error'}), {status: response.status});
        }

        const result = await response.json();
        return new Response(JSON.stringify({success: true, message:result.message, data: result}), {status: 200});

    }catch(error){
        return new Response(JSON.stringify({success: false, message: 'Error'}), {status: 500});
    }
}