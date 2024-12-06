import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function DateForm({ onSubmit, projectName }) {
    
    function formDate(date){
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }

    const formik = useFormik({
        initialValues: {
            begin: '',
            end: ''
        },
        validationSchema: Yup.object({
            begin: Yup.date().required('Required').typeError('Invalid date'),
            end: Yup.date().required('Required').typeError('Invalid date')
        }),
        onSubmit: (values) =>{
            const transformedValues = {
                name: projectName,
                begin: formDate(values.begin),
                end: formDate(values.end)
            };
            //es que me lo devuelve en YYYY-MM-DD, y necesito DD-MM-YYYY
            onSubmit(transformedValues);
        }
    });

    return (
        <>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
            <div className='flex flex-col items-center spaxe-y-2'>
                <label htmlFor='begin' className='block text-gray-700 mb-2'>Begin Date</label>
                <input
                    type='date'
                    id='begin'
                    name='begin'
                    value={formik.values.begin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='input-form text-center'
                />
                {formik.touched.begin && formik.errors.begin ? (
                    <p className='text-red-500'>{formik.errors.begin}</p>
                ) : null}
            </div>
            <div className='flex flex-col items-center space-y-2'>
                <label htmlFor='end' className='block text-gray-700 mb-2'>End Date</label>
                <input
                    type='date'
                    id='end'
                    name='end'
                    value={formik.values.end}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='input-form text-center'
                />
                {formik.touched.end && formik.errors.end ? (
                    <p className='text-red-500'>{formik.errors.end}</p>
                ) : null}
            </div>
            <button
                type='submit'
                className='blue-button w-full mt-10'
                disabled={formik.isSubmitting || !formik.isValid}
            >
                Update Dates
            </button>
        </form>
        </>
    )

}
