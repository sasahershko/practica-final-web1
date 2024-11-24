'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Button} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {login} from '../../lib/login';

export default function Login(){

        //COMO LEER DESDE LAS COOKES
    // const cookieStore = cookies();
    // const token = cookieStore.get('bytoken');
    // const user = await validation(token);

    const router = useRouter();

    const formik = useFormik({
        initialValues:{
            email:'',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('E-mail inválido').required('Campo requerido'),
            password: Yup.string().required('Campo requerido')
        }),
        onSubmit: async(values) =>{
            try{
                const result = await login(values);

                if(result.success){
                    router.push('/pages/dashboard/summary');
                }else{
                    console.log('Credenciales inválidas');
                }

            }catch(error){
                console.log(error.message);
            
            }
        }
    });


    return(
        <div className='animate-fade-in-up'>
            <h1 className="text-center text-[50px] mt-36 max-h-screen text-black mb-10 font-bold">Log In</h1>

            <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit();}}className='flex mx-auto flex-col max-w-[300px]'>
                
                <div className='flex flex-col mb-4'>
                    <label className='text-black'>E-mail</label>
                    <input
                        type='email'
                        name='email'
                        value = {formik.values.email}
                        onChange={formik.handleChange}
                        className='input-form'
                    />
                    {formik.touched.email && formik.errors.email ? (<p className='text-center text-red-500'>{formik.errors.email}</p>): null}
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
                    
                    {formik.touched.password && formik.errors.password ? (<p className='text-center text-red-500'>{formik.errors.password}</p>):null}
                </div>


                {/* <button type='submit' className='bg-white text-black rounded-md mt-5 hover:bg-black hover:text-white transitiono  duration-300 ease-in-out py-3'>Send</button> */}
                <Button type='submit' className='mt-5 rounded-md bg-blue-500 hover:bg-blue-300 transition duration-300 ease-in-out'>Send</Button>
            </form>
        </div>
    )
}
