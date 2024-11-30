'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from '@/app/components/Card';
import ObjectSelector from '@/app/components/ObjectSelector';
import {useRouter} from 'next/navigation';

export default function ProjectForm({ title, initialValues, onSubmit, isEdit, onDelete, client, clients }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues:
        {
            name: '',
            email: '',
            projectCode: '',
            street: '',
            number: '',
            postal: '',
            city: '',
            province: '',
            code: '',
            clientId: '',
            ...initialValues
        },
        validationSchema: Yup.object({
            name: Yup.string().max(50, 'The name cannot exceed 100 characters').required('The field is required'),
            projectCode: Yup.string().max(50, 'The project code cannot exceed 50 characters').required('The field is required'),
            email: Yup.string().email('Invalid email').required('The field is required'),
            street: Yup.string().required('The field is required'),
            number: Yup.number().required('The field is required'),
            postal: Yup.string().matches(/^\d{5}$/, 'The postal code must have exactly 5 digits').required('The field is required'),
            city: Yup.string().required('The field is required'),
            province: Yup.string().required('The field is required'),
            code: Yup.string().required('The field is required'),
            clientId: Yup.string().required('The field is required'),
        }),
        onSubmit: async (values) => { handleSubmitProject(values) },
        validateOnChange: false,
        validateOnBlur: false,
    });

    const handleSubmitProject = async (values) => {
        try {
            const response = await fetch('/api/projects/addProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })

            if (!response.ok) {
                throw new Error('Error al añadir proyecto');
            }

            const result = await response.json();
            if (result.success) {
                alert('Proyecto añadido correctamente');
                router.push('/pages/dashboard/projects');
            }

        } catch (error) {
            console.log('Error al añadir proyecto', error.message);
        }
    }

    return (
        <div>
            <button className='blue-button' onClick={()=>router.push('/pages/dashboard/projects')}>Go back</button>
            <div className='grid grid-cols-3 gap-4 p-8  animate-fade-in-up'>
                <div className="col-span-2">
                    <h1 className='text-center text-[65px] font-bold text-black mb-3'>{title}</h1>
                    <div className='mb-5'>
                        {clients && (
                            <>
                                <ObjectSelector
                                    placeholder="Select a client"
                                    objects={clients}
                                    displayKey="name"
                                    onSelect={(client) => formik.setFieldValue('clientId', client._id)} />

                                {formik.errors.clientId && (
                                    <p className="text-red-500">{formik.errors.clientId}</p>
                                )}
                            </>
                        )}
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }} className="grid grid-cols-2 gap-4 mx-auto max-w-[600px]">
                        {[
                            { name: 'name', label: 'Name', type: 'text', colSpan: 2 },
                            { name: 'projectCode', label: 'Project Code', type: 'text' },
                            { name: 'email', label: 'Email', type: 'email' },
                            { name: 'street', label: 'Street', type: 'text' },
                            { name: 'number', label: 'Number', type: 'number' },
                            { name: 'postal', label: 'Postal', type: 'text' },
                            { name: 'city', label: 'City', type: 'text' },
                            { name: 'province', label: 'Province', type: 'text' },
                            { name: 'code', label: 'Code', type: 'text' },
                        ].map((field) => (
                            <div key={field.name} className={`flex flex-col ${field.colSpan ? `col-span-${field.colSpan}` : ''}`}>
                                <label className='text-black'>{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formik.values[field.name]}
                                    onChange={formik.handleChange}
                                    className="input-form"
                                />
                                {formik.errors[field.name] ? (<p className="text-center text-red-500">{formik.errors[field.name]}</p>) : null}
                            </div>
                        ))}


                        <button type="submit" className="blue-button mt-6 col-span-2 mx-auto w-full">{title}</button>

                        {isEdit &&
                            <button type="submit" className="red-button col-span-2 w-full" onClick={onDelete}>
                                Delete
                            </button>
                        }
                    </form>
                </div>

                {/* COLUMNA DERECHA */}
                <div className='space-y-6'>
                    <Card title="Client">
                        {client ? (
                            <div>
                                <p className="text-gray-500 text-sm">Name: {client.name}</p>
                                <p className="text-gray-500 text-sm">CIF: {client.cif}</p>
                                <p className="text-gray-500 text-sm">Address: {client.street} {client.number}</p>
                                <p className="text-gray-500 text-sm">{client.postal} {client.city} ({client.province})</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-500 text-sm">Select a client to see more details.</p>
                            </div>

                        )}

                    </Card>

                    <Card title="Notes">
                        <div className='flex flex-col'>
                            <p className="text-gray-500 text-sm">Add note about your project.</p>
                            <input type="text" className="input-form mt-5" placeholder="Add a note" />
                            <button className='blue-button' onClick={()=>alert(clients)}>Save</button>
                        </div>
                    </Card>
                    <Card title="Tags">
                        <div className='flex flex-col'>
                            <p className="text-gray-500 text-sm">Tags can be used to categorize projects into groups..</p>
                            <select className='mt-5 mb-5 bg-gray-100 rounded-md px-4 py-2 text-gray-500'>
                                <option>Tag 1</option>
                                <option>Tag 2</option>
                                <option>Tag 3</option>
                            </select>
                            <button className='blue-button'>Save</button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}