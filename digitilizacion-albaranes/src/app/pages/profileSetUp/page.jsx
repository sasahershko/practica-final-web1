'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NavBar from '../../components/NavBar';
import { Button } from '@nextui-org/react';
import { registrationComplete, getUserData } from '@/app/lib/auth';
import { useEffect, useState } from 'react';

export default function SignUpName({ isEdit }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await getUserData();
                setUser(userData?.data || null);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);


    console.log(user);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user?.name || '',
            surnames: user?.surnames || '',
            nif: user?.nif || '',
            email: user?.email || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            surnames: Yup.string().required('Los apellidos son obligatorios'),
            nif: Yup.string()
                .matches(/^[0-9]{8}[A-Za-z]$/, 'NIF must have 8 digits followed by a letter')
                .required('NIF is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await registrationComplete(values);
                if (response.success) {
                    alert('Profile updated successfully');
                } 
            } catch (error) {
                console.error('Error during profile update:', error);
                alert('Error interno al actualizar el perfil');
            }
        },
    });

    if (loading) {
        return <p>Cargando datos del usuario...</p>;
    }

    return (
        <>
            <NavBar />
            <div className="animate-fade-in-up">
                <h1 className="text-center text-[50px] mt-36 max-h-screen text-black mb-10 font-bold">
                    More Information
                </h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                    className="flex mx-auto flex-col max-w-[300px]"
                >
                    <div className="flex flex-col mb-4">
                        <label className="text-black">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className="input-form"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-center text-red-500">{formik.errors.name}</p>
                        )}
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-black">Surnames</label>
                        <input
                            type="text"
                            name="surnames"
                            value={formik.values.surnames}
                            onChange={formik.handleChange}
                            className="input-form"
                        />
                        {formik.touched.surnames && formik.errors.surnames && (
                            <p className="text-center text-red-500">{formik.errors.surnames}</p>
                        )}
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-black">NIF</label>
                        <input
                            type="text"
                            name="nif"
                            value={formik.values.nif}
                            onChange={formik.handleChange}
                            className="input-form"
                        />
                        {formik.touched.nif && formik.errors.nif && (
                            <p className="text-center text-red-500">{formik.errors.nif}</p>
                        )}
                    </div>

                    {isEdit &&
                        <div className="flex flex-col mb-4">
                            <label className="text-black">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="input-form"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-center text-red-500">{formik.errors.email}</p>
                            )}
                        </div>
                    }

                    <Button
                        type="submit"
                        className="mt-5 rounded-md bg-blue-500 hover:bg-blue-300 transition duration-300 ease-in-out"
                    >
                        Enviar
                    </Button>
                </form>
            </div>
        </>
    );
}
