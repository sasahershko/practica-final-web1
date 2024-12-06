'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { getDeliveryNoteById } from "@/app/lib/deliveryNotes";
import DeliveryForm from "@/app/pages/dashboard/deliveryNotes/components/DeliveryForm";

export default function DeliveryDetails() {
    const { id } = useParams();
    const [deliveryNote, setDeliveryNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await getDeliveryNoteById(id);
                setDeliveryNote(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

        }
        fetchData();
    }, [id]);

    return (
        <>
            {loading ? (<p>Loading...</p>) : (
                <DeliveryForm initialValues={deliveryNote} isEdit={true} title='Edit Delivery Note' />)
            }
        </>
    )
}