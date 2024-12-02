
'use client';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import NavBar from '../../components/NavBar';
import {Button} from '@nextui-org/react';

export default function SignUpName() {

    const formik = useFormik({
        initialValues:{
            name: '',
            surnames: '',
            nif: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            surnames: Yup.string().required('Los apellidos son obligatorios'),
            nif: Yup.string().matches(/^[0-9]{8}[A-Za-z]$/, 'NIF must have 8 digits followed by a letter').required('NIF is required')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return(
        <>
        <NavBar/>
            <div className='animate-fade-in-up'>
                <h1 className="text-center text-[50px] mt-36 max-h-screen text-black mb-10 font-bold">More information</h1>

                <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit();}}className='flex mx-auto flex-col max-w-[300px]'>
                    
                    <div className='flex flex-col mb-4'>
                        <label className='text-black'>Name</label>
                        <input
                            type='name'
                            name='name'
                            value = {formik.values.name}
                            onChange={formik.handleChange}
                            className='input-form'
                        />
                        {formik.touched.name && formik.errors.name ? (<p className='text-center text-red-500'>{formik.errors.name}</p>): null}
                    </div>
    

                    <div className='flex flex-col'>
                        <label className='text-black'>Surnames</label>
                        <input
                            type='surnames'
                            name='surnames'
                            value={formik.values.surnames}
                            onChange={formik.handleChange}
                            className='input-form'
                        />
                        
                        {formik.touched.surnames && formik.errors.surnames ? (<p className='text-center text-red-500'>{formik.errors.surnames}</p>):null}
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-black'>NIF</label>
                        <input
                            type='nif'
                            name='nif'
                            value={formik.values.nif}
                            onChange={formik.handleChange}
                            className='input-form'
                        />
                        
                        {formik.touched.nif && formik.errors.nif ? (<p className='text-center text-red-500'>{formik.errors.nif}</p>):null}
                    </div>

                    {/* <button type='submit' className='bg-white text-black rounded-md mt-5 hover:bg-black hover:text-white transitiono  duration-300 ease-in-out py-3'>Send</button> */}
                    <Button type='submit' className='mt-5 rounded-md bg-blue-500 hover:bg-blue-300 transition duration-300 ease-in-out'>Send</Button>
                </form>
            </div>   
        </>

    )
}