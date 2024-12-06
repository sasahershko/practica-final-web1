import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

export default function DeliveryForm({ initialValues, onSubmit, title, isEdit, onDelete }) {

    const formik = useFormik({
        initialValues: {
            clientId: initialValues.clientId || '',
            projectId: initialValues.projectId || '',
            format: initialValues.format || '',
            material: initialValues.material || '',
            hours: initialValues.hours || 0,
            description: initialValues.description || '',
            workdate: initialValues.workdate ? moment(initialValues.workdate, 'DD-MM-YYYY').format('YYYY-MM-DD') : '',
        },
        validationSchema: Yup.object({
            clientId: Yup.string().required('Required'),
            projectId: Yup.string().required('Required'),
            format: Yup.string().oneOf(['material', 'hours'], 'Invalid, choose "material" or "hours"').required('Required'),
            material: Yup.string(),
            hours: Yup.number(),
            description: Yup.string().required('Required'),
            workdate: Yup.date().required('Required'),
        }),
        onSubmit: (values) => {
            const transformedValues = ({
                clientId: values.clientId,
                projectId: values.projectId,
                format: values.format,
                material: values.material,
                hours: isNaN(parseInt(values.hours, 10)) ? 0 : parseInt(values.hours, 10),
                description: values.description,
                workdate: moment(values.workdate, 'YYYY-MM-DD').format('D/M/YYYY'), //le he quitado DD y tal por los ceros
            });

            console.log('DESPUÉS FORMULARIO', transformedValues);
            onSubmit(transformedValues);
        }
    });


    return (
        <div className='grid grid-cols-3 gap-4 p-8  animate-fade-in-up'>
            <div className="col-span-3">
                <h1 className='text-center text-[65px] font-bold text-black mb-3'>{title}</h1>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }} className="grid grid-cols-2 gap-4 mx-auto max-w-[600px]">

                    <div className="flex flex-col">
                        <label className="text-black">Format</label>
                        <select
                            name="format"
                            value={formik.values.format}
                            onChange={formik.handleChange}
                            className="input-form"
                        >
                            <option value="" disabled>Choose an option</option>
                            <option value="material">Material</option>
                            <option value="hours">Hours</option>
                        </select>
                        {formik.touched.format && formik.errors.format ? (
                            <p className="text-center text-red-500">{formik.errors.format}</p>
                        ) : null}
                    </div>


                    {[
                        { name: 'material', label: 'Material', type: 'text' },
                        { name: 'hours', label: 'Hours', type: 'number' },
                        { name: 'description', label: 'Description', type: 'text' },
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
                            value={formik.values.workdate}
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