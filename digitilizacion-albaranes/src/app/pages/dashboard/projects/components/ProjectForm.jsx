import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from '../../../../components/Card';

export default function ProjectForm({ title, initialValues, onSubmit, isEdit, onDelete, client }) {

    const formik = useFormik({
        enableReinitialize: true, //si ya existen campos, los rellena
        initialValues: {
            name: '',
            email: '',
            street: '',
            number: '',
            postal: '',
            city: '',
            province: '',
            code: '',
            clientId: '',
            ...initialValues,
        },
        validationSchema: Yup.object({
            name: Yup.string().max(50, 'The name cannot exceed 100 characters').required('The field is required'),
            email: Yup.string().email('Invalid email').required('The field is required'),
            street: Yup.string().required('The field is required'),
            number: Yup.number().required('The field is required'),
            postal: Yup.string().matches(/^\d{5}$/, 'The postal code must have exactly 5 digits').required('The field is required'),
            city: Yup.string().required('The field is required'),
            province: Yup.string().required('The field is required'),
            code: Yup.string().required('The field is required'),
            clientId: Yup.string().required('The field is required'),
        }),
        onSubmit: onSubmit,
    });

    return (
        <div className='grid grid-cols-3 gap-4 p-8  animate-fade-in-up'>
            <div className="col-span-2">
                <h1 className='text-center text-[65px] font-bold text-black mb-3'>{title}</h1>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }} className="grid grid-cols-2 gap-4 mx-auto max-w-[600px]">
                    {[
                        { name: 'name', label: 'Name', type: 'text'},
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
                            <p className="text-gray-500 text-sm">No client selected</p>
                        </div>)}

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