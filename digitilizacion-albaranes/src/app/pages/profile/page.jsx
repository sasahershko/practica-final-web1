'use client';
import { useEffect, useState } from 'react';
import { getUserData, deleteUser, updateUser, uploadLogo } from '@/app/lib/user';
import NavBar from '@/app/components/NavBar';
import Loading from '@/app/components/Loading';
import SuccessModal from '@/app/components/SuccessModal';
import ProfileForm from './components/profileForm';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    console.log(user);

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

    const handleDelete = async () => {
        const response = await deleteUser();
        if (response.success) {
            setShowModal(true);
        } else {
            alert('Error deleting user');
        }
    };

    const handleUpdate = async (values) => {
        try {
            await updateUser(values);
            setShowModal(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogo = async (image) => {
        try {
            const formData = new FormData();
            formData.append('image', image, image.name);

            const response = await uploadLogo(formData);
            if(response.success){
                console.log('SUCCESS!')
            }else{
                console.log('error')
            }
            alert('Logo actualizado correctamente.');
        } catch (err) {
            console.error('Error al subir el logo:', err.message);
            alert('Error al actualizar el logo.');
        }
    };


    return (
        loading ? (
            <Loading />
        ) : (
            <>
                <NavBar />
                {isEditing ? (
                    <>
                        <ProfileForm
                            isEdit={true}
                            initialValues={user}
                            onCancel={() => setIsEditing(false)}
                            onSubmit={handleUpdate}
                            onSubmitLogo={handleLogo}
                        />
                    </>
                ) : (
                    <div className="animate-fade-in-up max-w-7xl mx-auto mt-20 p-10 bg-gradient-to-r from-purple-100 to-blue-50 shadow-xl rounded-2xl">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                            {/* IZQUIERDA */}
                            <div className="flex flex-col items-center">
                                <h1 className="text-[60px] font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-center tracking-wide mb-16">
                                    User Profile
                                </h1>
                                <img
                                    src={
                                        user.logo ||
                                        "https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg"
                                    }
                                    alt="User Logo"
                                    className="w-48 h-48 rounded-full border-4 border-purple-300 shadow-lg transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* DERECHA */}
                            <div className="flex-1 grid grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="font-semibold text-purple-500 mb-2">Full Name</h2>
                                    <p className="text-gray-900 text-lg font-medium">
                                        {user.name ? `${user.name} ${user.surnames || ""}` : "Not provided"}
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="font-semibold text-purple-500 mb-2">Email Address</h2>
                                    <p className="text-gray-900 text-lg font-medium">
                                        {user.email || "Not provided"}
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="font-semibold text-purple-500 mb-2">NIF</h2>
                                    <p className="text-gray-900 text-lg font-medium">
                                        {user.nif || "Not provided"}
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="font-semibold text-purple-500 mb-2">Role</h2>
                                    <p className="text-gray-900 text-lg font-medium">{user.role || "User"}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="font-semibold text-purple-500 mb-2">Status</h2>
                                    <p
                                        className={`text-lg font-medium ${user.status === 1 ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {user.status === 1 ? "Active" : "Inactive"}
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="font-semibold text-purple-500 mb-2">Notifications</h2>
                                    <p
                                        className={`text-lg font-medium ${user.notifications ? "text-blue-600" : "text-gray-400"
                                            }`}
                                    >
                                        {user.notifications ? "Enabled" : "Disabled"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* BOTONES */}
                        <div className="mt-12 flex justify-center gap-10 h-16">
                            <button
                                className="blue-button rounded-lg w-32"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                            <button
                                className="red-button rounded-lg"
                                onClick={() => handleDelete()}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                )}
                {showModal && (
                    <SuccessModal
                        message="User deleted successfully!"
                        redirectPath="/pages/profile"
                        buttonText="Go to Home"
                        onClose={() => { setShowModal(false); }}
                    />
                )}
            </>
        )
    );
}
