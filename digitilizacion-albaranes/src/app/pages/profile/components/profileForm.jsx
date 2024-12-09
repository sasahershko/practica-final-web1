'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ProfileForm({ initialValues, isEdit, onCancel, onSubmit }) {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: initialValues?.name || '',
            surnames: initialValues?.surnames || '',
            nif: initialValues?.nif || '',
            email: initialValues?.email || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required field'),
            surnames: Yup.string().required('Required field'),
            nif: Yup.string()
                .matches(/^[0-9]{8}[A-Za-z]$/, 'NIF must have 8 digits followed by a letter')
                .required('Required field'),
        }),
        onSubmit: onSubmit,
    });

    return (

        <>
            <div className="animate-fade-in-up max-w-4xl mx-auto mt-28 p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-[100px] font-extrabold text-center text-blue-600 mb-8">
                    Edit Profile
                </h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div>
                        <label className="font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className="border rounded-lg p-2 w-full text-black"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm">{formik.errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Surnames</label>
                        <input
                            type="text"
                            name="surnames"
                            value={formik.values.surnames}
                            onChange={formik.handleChange}
                            className="border rounded-lg p-2 w-full text-black"
                        />
                        {formik.touched.surnames && formik.errors.surnames && (
                            <p className="text-red-500 text-sm">{formik.errors.surnames}</p>
                        )}
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">NIF</label>
                        <input
                            type="text"
                            name="nif"
                            value={formik.values.nif}
                            onChange={formik.handleChange}
                            className="border rounded-lg p-2 w-full text-black"
                        />
                        {formik.touched.nif && formik.errors.nif && (
                            <p className="text-red-500 text-sm">{formik.errors.nif}</p>
                        )}
                    </div>

                    {isEdit && (
                        <div>
                            <label className="font-semibold text-gray-700">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="border rounded-lg p-2 w-full text-black"
                                disabled
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm">{formik.errors.email}</p>
                            )}
                        </div>
                    )}

                    <div className="col-span-2 flex justify-between mt-10">
                        <button type="submit" className="blue-button"  >
                            Submit
                        </button>
                        <button onClick={onCancel} className="red-button"  >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
