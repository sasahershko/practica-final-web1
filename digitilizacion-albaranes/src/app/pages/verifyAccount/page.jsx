'use client'
import {useState} from 'react';
import {Button} from '@nextui-org/react';
import {verify} from '../../lib/verify';
import {useRouter} from 'next/navigation';


export default function VerifyAccount(){

    const router = useRouter();

    const [code, setCode] = useState(new Array(6).fill(''));

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

        if (!codeValue || codeValue.length !== 6) {
            alert('Por favor, ingresa el código completo (6 dígitos).');
            return;
        }else{
            console.log(codeValue);
        }

        try{
            const result = await verify(codeValue);

            if(result.success){
                console.log('Verificación correcta: ', result);

                // router.push('/pages//summary');
                router.push('/pages/signupName');
            }

        }catch(error){
            console.log('Error al verificar la cuenta: ', error.message);
        }

    };


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
{/* 
                <Button onClick={deleteAccount} className='mt-5 rounded-md bg-blue-500 hover:bg-blue-300 transition duration-300 ease-in-out'>
                    DELETE ACCOUNT
                </Button> */}
            </form>
        </div>
    )
}