// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { updateUserProfile, deleteUserAccount } from '@/app/lib/user';

// export default function ProfilePage({ user }) {
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Formik para manejar el formulario de edición del perfil
//     const formik = useFormik({
//         initialValues: {
//             name: user.name || '',
//             surname: user.surname || '',
//             nif: user.nif || '',
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required('Name is required').max(50, 'Maximum 50 characters'),
//             surname: Yup.string().required('Surname is required').max(50, 'Maximum 50 characters'),
//             nif: Yup.string()
//                 .matches(/^[A-Z0-9]+$/, 'Invalid NIF format')
//                 .required('NIF is required'),
//         }),
//         onSubmit: async (values) => {
//             setLoading(true);
//             try {
//                 await updateUserProfile(values); // Llama a la función para actualizar el perfil
//                 alert('Profile updated successfully!');
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         },
//     });

//     // Función para manejar la eliminación de la cuenta
//     const handleDeleteAccount = async () => {
//         if (confirm('Are you sure you want to delete your account?')) {
//             setLoading(true);
//             try {
//                 await deleteUserAccount(); // Llama a la función para eliminar la cuenta
//                 alert('Account deleted successfully.');
//                 router.push('/'); // Redirige al usuario después de eliminar la cuenta
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return (
//         <div className="container mx-auto p-8">
//             <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>
//             {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//             <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6 max-w-md mx-auto">
//                 <div>
//                     <label className="block text-gray-700">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formik.values.name}
//                         onChange={formik.handleChange}
//                         className="input-form"
//                     />
//                     {formik.touched.name && formik.errors.name && (
//                         <p className="text-red-500">{formik.errors.name}</p>
//                     )}
//                 </div>
//                 <div>
//                     <label className="block text-gray-700">Surname</label>
//                     <input
//                         type="text"
//                         name="surname"
//                         value={formik.values.surname}
//                         onChange={formik.handleChange}
//                         className="input-form"
//                     />
//                     {formik.touched.surname && formik.errors.surname && (
//                         <p className="text-red-500">{formik.errors.surname}</p>
//                     )}
//                 </div>
//                 <div>
//                     <label className="block text-gray-700">NIF</label>
//                     <input
//                         type="text"
//                         name="nif"
//                         value={formik.values.nif}
//                         onChange={formik.handleChange}
//                         className="input-form"
//                     />
//                     {formik.touched.nif && formik.errors.nif && (
//                         <p className="text-red-500">{formik.errors.nif}</p>
//                     )}
//                 </div>
//                 <button
//                     type="submit"
//                     className={`blue-button w-full ${loading ? 'opacity-50' : ''}`}
//                     disabled={loading}
//                 >
//                     {loading ? 'Saving...' : 'Save Changes'}
//                 </button>
//             </form>
//             <button
//                 onClick={handleDeleteAccount}
//                 className="red-button mt-6 w-full"
//                 disabled={loading}
//             >
//                 Delete Account
//             </button>
//         </div>
//     );
// }
'use client';

export default function ProfilePage() {
    return (
        <div>
            <h1 className="text-black">Profile Page</h1>
        </div>
    );
}