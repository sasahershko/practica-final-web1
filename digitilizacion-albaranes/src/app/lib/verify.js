

export async function verify (token,  codeValue) {

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user/validation`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({code: codeValue})
        });

        const data = await response.json();

        if(response.ok){
            setMessage('Cuenta verificada correctamente');
            console.log('Cuenta verificada ', data);
            
        }else{
            console.log(`ERROR AL VERIFICAR CUENTA: ${data.message || JSON.stringify(data)}`);
        }
    }catch(error){
        alert('ERROR DENTRO DE VERIFY', error.message);
    }
}