'use client';
import { useEffect, useState } from 'react';
import { getUserData, deleteUser } from '@/app/lib/auth';
import NavBar from '@/app/components/NavBar';
import Loading from '@/app/components/Loading';
import SuccessModal from '@/app/components/SuccessModal';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
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

    const handleDelete = async () => {
        const response = await deleteUser();
        if (response.success) {
            setShowModal(true);
        } else {
            alert('Error deleting user');
        }
    };

    console.log(user);
    return (
        loading ? (
            <Loading />
        ) : (
            <>
                <NavBar />
                
                <div className="animate-fade-in-up max-w-4xl mx-auto mt-28 p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-[100px] font-extrabold text-center text-blue-600 mb-8">
                        User Profile
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* <div>
                            <img href={user.logo} alt='User Logo'/>
                        </div> */}
                        <div>
                            <h2 className="font-semibold text-gray-700">Full Name</h2>
                            <p className="text-gray-900">
                                {user.name ? `${user.name} ${user.surnames || ''}` : 'Not provided'}
                            </p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-700">Email Address</h2>
                            <p className="text-gray-900">{user.email || 'Not provided'}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-700">NIF</h2>
                            <p className="text-gray-900">{user.nif || 'Not provided'}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-700">Role</h2>
                            <p className="text-gray-900">{user.role || 'User'}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-700">Status</h2>
                            <p className="text-gray-900">
                                {user.status === 1 ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-700">Notifications</h2>
                            <p className="text-gray-900">
                                {user.notifications ? 'Enabled' : 'Disabled'}
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-between">
                        <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-400 transition duration-300"
                            onClick={() => alert('Edit profile functionality coming soon!')}
                        >
                            Edit Profile
                        </button>
                        <button
                            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-500 transition duration-300"
                            onClick={() => handleDelete()}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <SuccessModal
                        message="User deleted successfully!"
                        redirectPath="/"
                        buttonText="Go to Home"
                    />
                )}
            </>
        )
    );
}
