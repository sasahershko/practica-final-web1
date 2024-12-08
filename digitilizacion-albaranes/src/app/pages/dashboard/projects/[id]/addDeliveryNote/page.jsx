'use client';
import { useParams, useRouter } from 'next/navigation';
import { useProjectDetails } from '@/app/hooks/useProjectDetails';
import DeliveryForm from '@/app/pages/dashboard/deliveryNotes/components/DeliveryForm';
import { addDeliveryNote } from '@/app/lib/deliveryNotes';
import Loading from '@/app/components/Loading';

export default function AddDeliveryNotesByProject() {
    const { id } = useParams();
    const { project, loading, error, client } = useProjectDetails(id);
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
            const data = await addDeliveryNote(values);
            alert('Delivery note added correctly');
            router.push('/pages/dashboard/deliveryNotes');
        } catch (error) {
            console.error('Error al añadir nota de entrega:', error.message);
            alert('Error al añadir nota de entrega');
        }
    };
    

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (            
            <DeliveryForm
                initialValues={{ clientId: client._id, projectId: project._id, }}
                title='Add Delivery Note'
                isEdit={false}
                onSubmit={handleSubmit}
            />)}

        </div>
    )
}