import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

export default function ClientForm({ initialValues, onSubmit, onSubmitLogo, title, isEdit, onDelete }) {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.includes('image')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result); // Previsualización
                setFile(file); //archivo original para la API
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    };

    const formik = useFormik({
        enableReinitialize: true, //si ya existen campos, los rellena
        initialValues: initialValues,
        validationSchema: Yup.object({
            name: Yup.string().max(50, 'The name cannot exceed 100 characters').required('The field is required'),
            cif: Yup.string().matches(/^[A-Z]\d{7}[A-Z0-9]$/, 'Invalid CIF (e.g., A12345678 or B1234567X)').length(9, 'The CIF must have exactly 9 characters').required('The field is required'),
            street: Yup.string().required('The field is required'),
            number: Yup.number().min(0, 'Invalid number').required('The field is required'),
            postal: Yup.string().min(0, 'Invalid number').matches(/^\d{5}$/, 'The postal code must have exactly 5 digits').required('The field is required'),
            city: Yup.string().required('The field is required'),
            province: Yup.string().required('The field is required'),
        }),
        onSubmit: (values) => {
            const transformedValues = {
                name: values.name,
                cif: values.cif,
                address: {
                    street: values.street,
                    number: values.number,
                    postal: values.postal,
                    city: values.city,
                    province: values.province,
                },
            };
            onSubmit(transformedValues);
        },
    });


    const triggerFileInput = () => {
        document.getElementById('file-input').click();
    };

    return (
        <div className={`grid ${isEdit ? 'grid-cols-3' : 'grid-cols-1'} gap-4 p-8 animate-fade-in-up`}>
            <div className={`${isEdit ? 'col-span-2' : 'col-span-1 mx-auto'}`}>
                <h1 className='text-center text-[65px] font-bold text-black mb-3'>{title}</h1>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }} className="grid grid-cols-2 gap-4 mx-auto max-w-[600px]">
                    {[
                        { name: 'name', label: 'Name', type: 'text', colSpan: 2 },
                        { name: 'cif', label: 'CIF', type: 'text' },
                        { name: 'street', label: 'Street', type: 'text' },
                        { name: 'number', label: 'Number', type: 'number', min:0 },
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
            {isEdit &&
                <div>
                    <img src={image ? image : initialValues.logo} alt="Client Logo" className="mb-5 rounded-lg" />
                    <input
                        type="file"
                        id="file-input"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <button
                        onClick={triggerFileInput}
                        className="blue-button w-full"
                    >
                        Select Image
                    </button>
                    <button
                        onClick={() => {
                            if (file) {
                                onSubmitLogo(file);
                            } else {
                                alert('Please select an image first.');
                            }
                        }}
                        className="blue-button w-full mt-4"
                    >
                        Apply Image
                    </button>
                </div>
            }
        </div>

    )
}