export async function POST(req){

    try{
        const body = await req.json();

        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/register', {
            method: POST,
            headers:{   
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                name: body.name,
                surname: body.surname,
                mail: body.mail,
                password: body.password
            })

        });
        
        const data = await response.json();

        if(response.ok){
            return new Response(JSON.stringify(data), {status:200});
        }else{
            return new Response(JSON.stringify({ error: data.error} || 'Error en el registro'), {status:response.status});
        }

    }catch(e){
        return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 });
    }
}