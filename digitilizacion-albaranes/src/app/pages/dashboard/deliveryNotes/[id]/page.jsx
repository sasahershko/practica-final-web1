'use client';
import { useEffect, useState } from "react";
import {useParams} from 'next/navigation';
import { getDeliveryNoteById } from "@/app/lib/deliveryNotes";

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
                <div className="text-black">
                    <h1>{deliveryNote.description}</h1>
                    <p>{deliveryNote._id}</p>
                    <p>{deliveryNote.clientAddress}</p>
                </div>
            )}
        </>
    )
}