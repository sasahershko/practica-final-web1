'use client';
import { useParams, useRouter } from 'next/navigation';
import { useProjectDetails } from '@/app/hooks/useProjectDetails';
import DeliveryForm from '@/app/pages/dashboard/deliveryNotes/components/DeliveryForm';


export default function AddDeliveryNotesByProject(){
    const { id } = useParams();
    const { project, loading, error, client } = useProjectDetails(id);


    return(
        <div>
            <DeliveryForm
                initialValues={{ clientId: client._id, projectId: project._id,}}
                title='Add Delivery Note'
                isEdit={false}
                onSubmit={(values) => console.log(values)}
            />
        </div>
    )
}