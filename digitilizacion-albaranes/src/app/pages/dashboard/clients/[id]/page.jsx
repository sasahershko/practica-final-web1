'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ClientForm from '../components/ClientForm';
import { getClientById, updateClient, deleteClient, uploadLogo } from '@/app/lib/clients';
import Loading from '@/app/components/Loading';
import SuccessModal from '@/app/components/SuccessModal';

export default function EditClientPage() {
    const { id } = useParams();
    const router = useRouter();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({ message: '', redirectPath: '', buttonText: '' });

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await getClientById(id);
                setClient({
                    name: data.name || '',
                    cif: data.cif || '',
                    street: data.address?.street || '',
                    number: data.address?.number || '',
                    postal: data.address?.postal || '',
                    city: data.address?.city || '',
                    province: data.address?.province || '',
                    logo: data.logo || 'https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg',
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);

    const handleUpdate = async (values) => {
        try {
            await updateClient(id, values);
            setModalConfig({
                message: 'Client updated successfully!',
                redirectPath: '/pages/dashboard/clients',
                buttonText: 'Go to Clients',
            });
            setShowModal(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteClient(id);
            setModalConfig({
                message: 'Client deleted successfully!',
                redirectPath: '/pages/dashboard/clients',
                buttonText: 'Go to Clients',
            });
            setShowModal(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogo = async (image) => {
        try {
            const formData = new FormData();
            formData.append('image', image, image.name);

            const response = await uploadLogo(id, formData);
            alert('Logo actualizado correctamente.');
        } catch (err) {
            console.error('Error al subir el logo:', err.message);
            alert('Error al actualizar el logo.');
        }
    };

    if (error) {
        return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
    }

    return (
        loading ? (
            <Loading />
        ) : (
            <>
                <div className="p-8">
                    <button className="blue-button" onClick={() => router.push('/pages/dashboard/clients')}>
                        Go back
                    </button>
                    <ClientForm
                        initialValues={client}
                        onSubmit={handleUpdate}
                        onSubmitLogo={handleLogo}
                        title="Edit Client"
                        isEdit={true}
                        onDelete={handleDelete}
                    />
                </div>

                {showModal && (
                    <SuccessModal
                        message={modalConfig.message}
                        redirectPath={modalConfig.redirectPath}
                        buttonText={modalConfig.buttonText}
                    />
                )}
            </>
        )
    );
}
