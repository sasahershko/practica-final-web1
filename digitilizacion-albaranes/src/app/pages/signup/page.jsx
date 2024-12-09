'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { register } from '@/app/lib/user';
import { useState } from 'react';
import ErrorPage from '@/app/components/ErrorPage';
import NavBar from '@/app/components/NavBar';

export default function SignUp() {
    const router = useRouter();

    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('E-mail inválido').required('Campo requerido'),
            password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Campo requerido')
        }),
        onSubmit: async (values) => {

            console.log(values);
            try {
                // const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user/register`;
                const result = await register(values);
                if (result.success) {
                    router.push('/pages/verifyAccount');
                }else{
                    setError(true);
                }

            } catch (error) {
                setError(true);
                console.log(error.message);
            }
        }
    })

    return (
        <div>
            <NavBar />
            {error ? ( <ErrorPage handleError={() => setError(false)} /> ) : (
            <div className='animate-fade-in-up'>
                <h1 className="text-center text-[50px] mt-36 max-h-screen text-black mb-10 font-bold">Sign Up</h1>

                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }} className='flex flex-col mx-auto max-w-[300px]'>
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
            )}
        </div>
        )

}