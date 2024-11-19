'use client'
import {useState} from 'react';
import {Button} from '@nextui-org/react';

export default function VerifyAccount(){

    const [code, setCode] = useState(new Array(6).fill(''));
    const [message, setMessage] = useState('');

    const handleChange= (e, index) =>{
        const newCode = [...code];
        newCode[index] = e;
        setCode(newCode);

        //mover al siguiente input si hay un valor
        if(e && index < code.length -1){
            //cada cuadra tiene un id único 
            document.getElementById(`code-${index+1}`).focus();
        }
    };

    const handleKeyDown = (e, index) =>{
        if(e.key === 'Backspace'){
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);

            //mover al input anterior si se puede
            if(index > 0){
                document.getElementById(`code-${index-1}`).focus();
            }
        }
    };


    const handleSubmit = async(e) =>{
        e.preventDefault();

        const codeValue = code.join('');
        // console.log('CODE VALUE', codeValue);

            //recuperar token JWT del registro
        const token= localStorage.getItem('jwt');
        if(!token){
            alert('NO HAY TOKEN');
            return;
        }

        try{
            const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/validation', {
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
                
            }else{
                setMessage(`ERROR AL VERIFICAR CUENTA: ${data.message || JSON.stringify(data)}`);
            }
        }catch(error){
            alert('ERROR DENTRO DE VERIFY', error.message);
        }

    }

    return(
        <div className='animate-fade-in-up'>
            <h1 className="text-center text-[50px] mt-36 max-h-screen text-black mb-10 font-bold">Verify Account</h1>

            <p className='text-center text-black mb-4'>Enter the code we sent you to your e-mail</p>

            <form onSubmit={handleSubmit} className='flex flex-col max-w-[300px] mx-auto items-center'>
                <div className='flex gap-2 mb-4'>
                    {code.map((digit, index) =>{
                        return(
                            <input
                            key={index}
                            id={`code-${index}`}
                            type='text'
                            maxLength='1'
                            value={digit}
                            onChange={(e)=>handleChange(e.target.value, index)}
                            onKeyDown={(e)=>handleKeyDown(e, index)}
                            className='text-black w-[80px] h-[100px] border border-blue-200 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-purple-400'
                        />
                    )
                    })}

                </div>
                    
                <Button type='submit' className='mt-5 rounded-md bg-blue-500 hover:bg-blue-300 transition duration-300 ease-in-out'>
                    Send verification
                </Button>
            </form>
        </div>
    )
}