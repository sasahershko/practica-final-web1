import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function DeliveryForm({ initialValues, onSubmit, title, isEdit, onDelete }) {

    const formik = useFormik({
        initialValues: {
            clientId: '',
            projectId: '',
            format: '',
            material: '',
            hours: '',
            description: '',
            workdate: '',
        },
        validationSchema: Yup.object({
            clientId: Yup.string().required('Required'),
            projectId: Yup.string().required('Required'),
            format: Yup.string(),
            material: Yup.string(),
            hours: Yup.string(),
            description: Yup.string().required('Required'),
            workdate: Yup.date(),
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });


    return (
        <div className='grid grid-cols-3 gap-4 p-8  animate-fade-in-up'>
            <div className="col-span-3">
                <h1 className='text-center text-[65px] font-bold text-black mb-3'>{title}</h1>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }} className="grid grid-cols-2 gap-4 mx-auto max-w-[600px]">
                    {[
                        { name: 'format', label: 'Format', type: 'text' },
                        { name: 'material', label: 'Material', type: 'text' },
                        { name: 'hours', label: 'Hours', type: 'text' },
                        { name: 'description', label: 'Description', type: 'number' },
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

                    <div className={`flex flex-col col-span-2`}>
                        <label className='text-black'>Workdate</label>
                        <input
                            type='date'
                            name='workdate'
                            value='workdate'
                            onChange={formik.handleChange}
                            className="input-form text-center"
                        />
                        {formik.touched.workdate && formik.errors.workdate ? (<p className="text-center text-red-500">{formik.errors.workdate}</p>) : null}
                    </div>

                    <button type="submit" className="blue-button mt-6 col-span-2 mx-auto w-full">{title}</button>
                    {isEdit &&
                        <button type="button" className="red-button col-span-2 w-full" onClick={onDelete}>
                            Delete
                        </button>
                    }
                </form>
            </div>
        </div>

    )
}