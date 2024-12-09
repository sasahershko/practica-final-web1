'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { getDeliveryNoteById } from "@/app/lib/deliveryNotes";
import DeliveryForm from "@/app/pages/dashboard/deliveryNotes/components/DeliveryForm";
import { updateDeliveryNote, deleteDeliveryNote, getDeliveryNotes} from "@/app/lib/deliveryNotes";
import Loading from "@/app/components/Loading";


export default function DeliveryDetails() {
    const { id } = useParams();
    const [deliveryNote, setDeliveryNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await getDeliveryNotes();
                //busco la nota específica por id
                const deliveryNote = response.find((note) => note._id === id); //lo hago asi, porque si saco el delivery por el id, no me salen datos como el id del cliente ni del proyecto

                if(!deliveryNote){
                    throw new Error('Delivery note not found');
                }

                setDeliveryNote(deliveryNote);
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }

        }
        fetchData();
    }, [id]);

    const handleUpdate = async (values) =>{
        try{
            await updateDeliveryNote(id, values);
            alert('Delivery note edited correctly');
        }catch(error){
            alert('Error al editar la nota de entrega');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDeliveryNote(id);
            alert('Delivery note deleted correctly');
            router.push('/pages/dashboard/deliveryNotes');
        } catch (error) {
            console.error(error);
            alert('Error al eliminar la nota de entrega');
        }
    };

    return (
        <>
            {loading ? (<Loading/>) : (
                <DeliveryForm initialValues={deliveryNote} isEdit={true} title='Edit Delivery Note'  onSubmit={handleUpdate} onDelete={handleDelete}/>)
            }
        </>
    )
}