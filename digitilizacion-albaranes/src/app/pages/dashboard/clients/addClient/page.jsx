'use client'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useRouter} from 'next/navigation';
import Card from '../../../../components/Card';

export default function AddClientPage() {
    const router = useRouter();
    
    const formik = useFormik({
        initialValues:{
            name:'',
            cif:'',
            street: '',
            number: '',
            postal: '',
            city: '',
            province: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Campo requerido'),
            cif: Yup.string().required('Campo requerido'),
            street: Yup.string().required('Campo requerido'),
            postal: Yup.string().required('Campo requerido'),
            city: Yup.string().required('Campo requerido'),
            province: Yup.string().required('Campo requerido'),
        }),
        onSubmit: async(values) =>{
            console.log('hola');
            console.log('Preparando solicitud: ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            

            try{    
                console.log('Enviando datos');
                const response = await fetch('/api/clients/addClient', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                });

                console.log('RESPUESTA: ', response);
                const result = await response.json();
                console.log('RESULT.MESSAGE: ', result.message);

                if(result.success){
                    alert('cliente añadido correctamente');
                    router.push('/pages/dashboard/clients');
                }else{
                    alert('Error al añadir cliente', result.message);
                }
            }catch(error){
                alert('Error al añadir cliente', error.message);
            }

        }
    })
    
    return(
        <div className='grid grid-cols-3 gap-4 p-8  animate-fade-in-up'>
            <div className='col-span-2'>
                <h1 className="text-center text-[65px] font-bold text-black animate-fade-in-up mb-3">
                    New Client
                </h1>

                <Card title='Add Client'>
                    <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit();}} className='grid grid-cols-2 gap-4 mx-auto max-w-[600px]'>
                        <div className='flex flex-col col-span-2'>
                            <label className='text-black'>Name</label>
                            <input
                                type='text'
                                name='name'
                                value = {formik.values.name}
                                onChange={formik.handleChange}
                                className='input-form'
                            />
                            {formik.touched.name && formik.errors.name ? (<p className='text-center text-red-500'>{formik.errors.name}</p>): null}
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-black'>CIF</label>
                            <input
                                type='text'
                                name='cif'
                                value = {formik.values.cif}
                                onChange={formik.handleChange}
                                className='input-form'
                            />
                            {formik.touched.cif && formik.errors.cif ? (<p className='text-center text-red-500'>{formik.errors.cif}</p>): null}
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-black'>Street</label>
                            <input
                                type='text'
                                name='street'
                                value = {formik.values.street}
                                onChange={formik.handleChange}
                                className='input-form'
                            />
                            {formik.touched.street && formik.errors.street ? (<p className='text-center text-red-500'>{formik.errors.street}</p>): null}
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-black'>Number</label>
                            <input
                                type='number'
                                name='number'
                                value = {formik.values.number}
                                onChange={formik.handleChange}
                                className='input-form'
                            />
                            {formik.touched.number && formik.errors.number ? (<p className='text-center text-red-500'>{formik.errors.number}</p>): null}
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-black'>Postal</label>
                            <input
                                type='text'
                                name='postal'
                                value = {formik.values.postal}
                                onChange={formik.handleChange}
                                className='input-form'
                            />
                            {formik.touched.postal && formik.errors.postal ? (<p className='text-center text-red-500'>{formik.errors.postal}</p>): null}
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-black'>City</label>
                            <input
                                type='text'
                                name='city'
                                value = {formik.values.city}
                                onChange={formik.handleChange}
                                className='input-form'
                            />
                            {formik.touched.city && formik.errors.city ? (<p className='text-center text-red-500'>{formik.errors.city}</p>): null}
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-black'>Province</label>
                            <input
                                type='text'
                                name='province'
                                value = {formik.values.province}
                                onChange={formik.handleChange}
                                className='input-form'
                            />
                            {formik.touched.province && formik.errors.province ? (<p className='text-center text-red-500'>{formik.errors.province}</p>): null}
                        </div>

                        <button type='submit' className='nav-button mt-6 col-span-2 mx-auto'>Send</button>
                    </form>

                </Card>
            </div>


            {/* COLUMNA DERECHA */}
            <div className='space-y-6'>
                <Card title="Client Logo">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg
                        className="h-8 w-8 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    </div>
                </div>
                </Card>

                <Card title="Notes">
                <p className="text-gray-500 text-sm">Add note about your customer.</p>
                </Card>

                <Card title="Tags">
                <p className="text-gray-500 text-sm">
                    Tags can be used to categorize customers into groups.
                </p>
                </Card>
            </div>

            </div>
    )
}