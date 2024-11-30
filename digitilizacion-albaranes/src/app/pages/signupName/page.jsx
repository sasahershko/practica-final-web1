
'use client';
import {useFormik} from 'formik';
import * as Yup from 'yup';

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

    return (
        <div>
            <h1>SignUpName</h1>
            <form onSubmit={(e)=>{e.preventDefault; formik.handleSubmit}}>
                <input type="text" name="name" placeholder="Name" value={formik.values.name} onChange={formik.handleChange}/>
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                <input type="text" name="surnames" placeholder="Surnames" value={formik.values.surnames} onChange={formik.handleChange}/>
                {formik.errors.surnames ? <div>{formik.errors.surnames}</div> : null}
                <input type="text" name="nif" placeholder="NIF" value={formik.values.nif} onChange={formik.handleChange}/>
                {formik.errors.nif ? <div>{formik.errors.nif}</div> : null}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}