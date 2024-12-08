'use client'
import {useRouter} from 'next/navigation';
import ClientForm from '../components/ClientForm';
import {addClient} from '@/app/lib/clients';
import SuccessModal  from '@/app/components/SuccessModal';
import {useState} from 'react';

export default function AddClientPage(){
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async(values) =>{
        try{
            const data = await addClient(values);
            setShowModal(true);
        }catch(error){
            console.error(error);
            alert('Error al añadir cliente');
        }
    }

    return(
        <>
            <button className='blue-button' onClick={()=>router.push('/pages/dashboard/clients')}>Go back</button>
            <ClientForm initialValues={{name:'', cif:'', street:'', number:'', postal:'', city:'', province:''}} onSubmit={handleSubmit} title='Add Client' isEdit={false}/>
            {showModal && (
                <SuccessModal
                    message="Client added successfully!"
                    redirectPath="/pages/dashboard/clients"
                    buttonText="Go to Clients"
                />
            )}
        </>
    )
}