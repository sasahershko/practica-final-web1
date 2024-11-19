'use client'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button} from '@nextui-org/react';
import {useRouter} from 'next/navigation';

export default function SignUp() {
    const router = useRouter();

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('E-mail inválido').required('Campo requerido'),
            password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Campo requerido')
        }),
        onSubmit: async(values) => {
            console.log('Datos enviados', values);

            try{
                const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/register', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    })
                });

                const data = await response.json();
                console.log('Respuesta del backend:', data);

                if(response.ok){
                    localStorage.setItem('jwt', data.token);
                    console.log('DATA TOKEN', data.token);

                    router.push('/pages/verifyAccount')
                }else{
                    console.log(`RESPONSE NOT OKEY: ${data.message || JSON.stringify(data)}`);
                    return;
                }
            }catch(error){
                alert('Error al conectar con el servidor');
                console.log('ERROR AL CONECTAR SERVIDOR:', error.message)
            }
        }
    })

    return(
        <div className='animate-fade-in-up'>
            <h1 className="text-center text-[50px] mt-36 max-h-screen text-black mb-10 font-bold">Sign Up</h1>

            <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit();}} className='flex flex-col mx-auto max-w-[300px]'>
                <div className='flex flex-col mb-4'>
                    <label className='text-black'>E-mail</label>
                    <input
                        type='email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className='input-form'
                    />
                    {formik.touched.email && formik.errors.email ? (<p className='text-center text-red-500'>{formik.errors.email}</p>) : null}
                </div>
                
                <div className='flex flex-col'>
                    <label className='text-black'>Password</label>

                    <input
                        type='password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className='input-form'
                    />
                    {formik.touched.password && formik.errors.password ? (<p className='text-center text-red-500'>{formik.errors.password}</p>) : null}
                </div>

                <Button type='submit' className='mt-5 rounded-md bg-blue-500 hover:bg-blue-300 transition duration-300 ease-in-out'>Send</Button>
            </form>
        </div>
    )
}