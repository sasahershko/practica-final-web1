'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from '@/app/components/Card';
import ObjectSelector from '@/app/components/ObjectSelector';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import moment from 'moment';

export default function ProjectForm({ title, initialValues, onSubmit, isEdit, onDelete, client, clients }) {
    const router = useRouter();

    const [selectedClient, setSelectedClient] = useState(client);
    const [loading, setLoading] = useState(true);
    const toFormikFormat = (date) => moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const toApiFormat = (date) => moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');


    useEffect(() => {
        if (client) {
            setSelectedClient(client);
        }
        setLoading(false);
    }, [client]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:
        {
            name: initialValues?.name || '',
            email: initialValues?.email || '',
            projectCode: initialValues?.projectCode || '',
            street: initialValues?.street || '',
            number: initialValues?.number || '',
            postal: initialValues?.postal || '',
            city: initialValues?.city || '',
            province: initialValues?.province || '',
            code: initialValues?.code || '',
            clientId: initialValues?.clientId || '',
            notes: initialValues?.notes || '',
            begin: initialValues.begin ? toFormikFormat(initialValues.begin) : '',
            end: initialValues.end ? toFormikFormat(initialValues.end) : '',
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
            notes: Yup.string().max(500, 'The notes cannot exceed 500 characters'),
            begin: Yup.date(),
            end: Yup.date(),
        }),
        onSubmit: (values) => {
            const transformedValues = isEdit
                ? {
                    name: values.name,
                    code: values.code,
                    projectCode: values.projectCode,
                    email: values.email,
                    clientId: values.clientId,
                    address: {
                        street: values.street,
                        number: values.number,
                        postal: values.postal,
                        city: values.city,
                        province: values.province,
                    },
                    notes: values.notes,
                }
                : {
                    name: values.name,
                    projectCode: values.projectCode,
                    email: values.email,
                    address: {
                        street: values.street,
                        number: values.number,
                        postal: values.postal,
                        city: values.city,
                        province: values.province,
                    },
                    code: values.code,
                    clientId: values.clientId,
                    begin: toApiFormat(values.begin),
                    end: toApiFormat(values.end),
                };


            console.log(transformedValues);
            onSubmit(transformedValues);
        },
        validateOnChange: false,
        validateOnBlur: false,
    });

    const handleClientSelect = (client) => {
        formik.setFieldValue('clientId', client._id);
        setSelectedClient(client);
    }

    return (
        <div>
            <button className='blue-button' onClick={() => router.push('/pages/dashboard/projects')}>Go back</button>
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
                                    onSelect={handleClientSelect} />

                                {formik.errors.clientId && (
                                    <p className="text-red-500">{formik.errors.clientId}</p>
                                )}
                            </>
                        )}
                    </div>
                    <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4 mx-auto max-w-[600px]">
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

                        {isEdit && (
                            <>
                                <div className="flex flex-col col-span-1">
                                    <label className='text-black'>Begin Date</label>
                                    <input
                                        type="date"
                                        name="begin"
                                        value={formik.values.begin}
                                        onChange={formik.handleChange}
                                        className="input-form"
                                    />
                                    {formik.errors.begin ? (
                                        <p className="text-center text-red-500">{formik.errors.begin}</p>
                                    ) : null}
                                </div>
                                <div className="flex flex-col col-span-1">
                                    <label className='text-black'>End Date</label>
                                    <input
                                        type="date"
                                        name="end"
                                        value={formik.values.end}
                                        onChange={formik.handleChange}
                                        className="input-form"
                                    />
                                    {formik.errors.end ? (
                                        <p className="text-center text-red-500">{formik.errors.end}</p>
                                    ) : null}
                                </div>
                            </>
                        )}

                        <button type="submit" className="blue-button mt-6 col-span-2 mx-auto w-full">{title}</button>
                        {/* <button onClick={(e)=>{ e.preventDefault();console.log(client)}} className="blue-button mt-6 col-span-2 mx-auto w-full">CLIENTE</button> */}
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
                        {selectedClient ? (
                            <div>
                                <p className="text-gray-500 text-sm">Name: {selectedClient.name}</p>
                                <p className="text-gray-500 text-sm">CIF: {selectedClient.cif}</p>
                                <p className="text-gray-500 text-sm">Address: {selectedClient.address.street} {selectedClient.address.number}</p>
                                <p className="text-gray-500 text-sm">Postal:{selectedClient.address.postal} {selectedClient.address.city} ({selectedClient.address.province})</p>
                                <p className="text-gray-500 text-sm">City: {selectedClient.address.city} </p>
                                <p className="text-gray-500 text-sm">Provice:({selectedClient.address.province})</p>
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
                            {formik.values.notes && (
                                <div className="mt-5 p-3 border rounded bg-gray-50">
                                    <h4 className="font-bold text-black">Saved Note:</h4>
                                    <p className="text-gray-500 text-lg">{formik.values.notes}</p>
                                </div>
                            )}
                            <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }} className='flex flex-col'>
                                <input
                                    type="text"
                                    className="input-form mt-5"
                                    placeholder="Add a note"
                                    name="notes"
                                    value={formik.values.notes}
                                    onChange={formik.handleChange}
                                />
                                <button className='blue-button mt-3' type="submit">
                                    Save
                                </button>
                            </form>

                            {formik.errors.notes && (
                                <p className="text-red-500 text-sm mt-2">{formik.errors.notes}</p>
                            )}
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