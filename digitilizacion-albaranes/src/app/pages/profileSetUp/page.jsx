'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NavBar from '../../components/NavBar';
import { Button } from '@nextui-org/react';
import { updateUser, getUserData } from '@/app/lib/user';
import { useEffect, useState } from 'react';
import Loading from '@/app/components/Loading';
import SuccessModal from '@/app/components/SuccessModal'; 
import { useRouter } from 'next/navigation';

export default function SignUpName({ isEdit }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await getUserData();
                setUser(userData?.data || null);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user?.name || '',
            surnames: user?.surnames || '',
            nif: user?.nif || '',
            email: user?.email || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            surnames: Yup.string().required('Surnames are required'),
            nif: Yup.string()
                .matches(/^[0-9]{8}[A-Za-z]$/, 'NIF must have 8 digits followed by a letter')
                .required('NIF is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await updateUser(values);
                setShowSuccessModal(true); 
            } catch (error) {
                console.error('Error during profile update:', error);
                alert('Internal error while updating profile');
            }
        },
    });

    return (
        loading ? (
            <Loading />
        ) : (
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

                        {isEdit && (
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
                        )}

                        <Button
                            type="submit"
                            className="mt-5 rounded-md bg-blue-500 hover:bg-blue-300 transition duration-300 ease-in-out"
                        >
                            Submit
                        </Button>
                    </form>
                </div>


                {showSuccessModal && (
                    <SuccessModal
                        message="Profile updated successfully!"
                        redirectPath="/pages/dashboard/summary"
                        buttonText="Go to Dashboard"
                        onClose={() => setShowSuccessModal(false)}
                    />
                )}
            </>
        )
    );
}
