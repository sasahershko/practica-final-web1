import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from '../../../../components/Card';

export default function ClientForm({ initialValues, onSubmit, title, isEdit, onDelete }) {
    const formik = useFormik({
        enableReinitialize: true, //si ya existen campos, los rellena
        initialValues: initialValues,
        validationSchema: Yup.object({
            name: Yup.string().max(50, 'The name cannot exceed 100 characters').required('The field is required'),
            cif: Yup.string().matches(/^[A-Z]\d{7}[A-Z0-9]$/, 'Invalid CIF (e.g., A12345678 or B1234567X)').length(9, 'The CIF must have exactly 9 characters').required('The field is required'),
            street: Yup.string().required('The field is required'),
            postal: Yup.string().matches(/^\d{5}$/, 'The postal code must have exactly 5 digits').required('The field is required'),
            city: Yup.string().required('The field is required'),
            province: Yup.string().required('The field is required'),
        }),
        onSubmit: onSubmit,
    });



    return (
        <div className='grid grid-cols-3 gap-4 p-8  animate-fade-in-up'>
            <div className="col-span-2">
                <h1 className='text-center text-[65px] font-bold text-black mb-3'>{title}</h1>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }} className="grid grid-cols-2 gap-4 mx-auto max-w-[600px]">
                    {[
                        { name: 'name', label: 'Name', type: 'text', colSpan: 2 },
                        { name: 'cif', label: 'CIF', type: 'text' },
                        { name: 'street', label: 'Street', type: 'text' },
                        { name: 'number', label: 'Number', type: 'number' },
                        { name: 'postal', label: 'Postal', type: 'text' },
                        { name: 'city', label: 'City', type: 'text' },
                        { name: 'province', label: 'Province', type: 'text' },
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
                            {formik.touched[field.name] && formik.errors[field.name] ? (<p className="text-center text-red-500">{formik.errors[field.name]}</p>) : null}
                        </div>
                    ))}
                    <button type="submit" className="blue-button mt-6 col-span-2 mx-auto w-full">{title}</button>
                    {isEdit && 
                        <button type="button" className="red-button col-span-2 w-full" onClick={onDelete}>
                            Delete
                        </button>
}
                </form>
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