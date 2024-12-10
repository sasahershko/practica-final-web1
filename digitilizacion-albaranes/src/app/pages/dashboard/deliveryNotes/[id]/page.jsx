'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { getDeliveryNoteById } from "@/app/lib/deliveryNotes";
import DeliveryForm from "@/app/pages/dashboard/deliveryNotes/components/DeliveryForm";
import { updateDeliveryNote, deleteDeliveryNote, getDeliveryNotes } from "@/app/lib/deliveryNotes";
import Loading from "@/app/components/Loading";
import SuccessModal from "@/app/components/SuccessModal";

export default function DeliveryDetails() {
    const { id } = useParams();
    const [deliveryNote, setDeliveryNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDeliveryNotes();
                const deliveryNote = response.find((note) => note._id === id);
                if (!deliveryNote) {
                    throw new Error('Delivery note not found');
                }
                setDeliveryNote(deliveryNote);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async (values) => {
        try {
            await updateDeliveryNote(id, values);
            setSuccessMessage('Delivery note edited correctly');
            setShowSuccessModal(true);
        } catch (error) {
            alert('Error al editar la nota de entrega');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDeliveryNote(id);
            setSuccessMessage('Delivery note deleted correctly');
            setShowSuccessModal(true);
        } catch (error) {
            console.error(error);
            alert('Error al eliminar la nota de entrega');
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        if (successMessage.includes('deleted')) {
            router.push('/pages/dashboard/deliveryNotes');
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <DeliveryForm
                    initialValues={deliveryNote}
                    isEdit={true}
                    title='Edit Delivery Note'
                    onSubmit={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
            {showSuccessModal && (
                <SuccessModal
                    message={successMessage}
                    redirectPath={'/pages/dashboard/deliveryNotes'}
                    buttonText={successMessage.includes('deleted') ? 'Go to Delivery Notes' : 'Close'}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}
