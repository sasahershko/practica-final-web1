'use client';
import { useParams, useRouter } from 'next/navigation';
import { useProjectDetails } from '@/app/hooks/useProjectDetails';
import DeliveryForm from '@/app/pages/dashboard/deliveryNotes/components/DeliveryForm';
import { addDeliveryNote } from '@/app/lib/deliveryNotes';

export default function AddDeliveryNotesByProject() {
    const { id } = useParams();
    const { project, loading, error, client } = useProjectDetails(id);
    const router = useRouter();

    const handleSubmit = async (values) => {
        console.log('Valores enviados al formulario:', JSON.stringify(values)); // Inspecciona los valores
    
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
                <div className="flex justify-center items-center h-[400px]">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
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