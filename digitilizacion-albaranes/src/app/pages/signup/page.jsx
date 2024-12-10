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
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('This field is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters long')
                .required('This field is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('This field is required')
        }),
        onSubmit: async (values) => {
            try {
                const result = await register({ email: values.email, password: values.password });
                if (result.success) {
                    router.push('/pages/verifyAccount');
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
                console.log(error.message);
            }
        }
    });

    return (
        <div>
            <NavBar />
            {error ? (
                <ErrorPage handleError={() => setError(false)} />
            ) : (
                <div className='animate-fade-in-up'>
                    <h1 className="text-center text-[50px] mt-36 max-h-screen text-black mb-10 font-bold">Sign Up</h1>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                        className='flex flex-col mx-auto max-w-[300px]'
                    >
                        <div className='flex flex-col mb-4'>
                            <label className='text-black'>E-mail</label>
                            <input
                                type='email'
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='input-form'
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <p className='text-center text-red-500'>{formik.errors.email}</p>
                            ) : null}
                        </div>

                        <div className='flex flex-col mb-4'>
                            <label className='text-black'>Password</label>
                            <input
                                type='password'
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='input-form'
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <p className='text-center text-red-500'>{formik.errors.password}</p>
                            ) : null}
                        </div>

                        <div className='flex flex-col mb-4'>
                            <label className='text-black'>Confirm Password</label>
                            <input
                                type='password'
                                name='confirmPassword'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='input-form'
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <p className='text-center text-red-500'>{formik.errors.confirmPassword}</p>
                            ) : null}
                        </div>

                        <Button
                            type='submit'
                            className='mt-5 rounded-md bg-blue-500 hover:bg-blue-300 transition duration-300 ease-in-out'
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}
