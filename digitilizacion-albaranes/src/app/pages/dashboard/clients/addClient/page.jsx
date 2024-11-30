'use client'
import {useRouter} from 'next/navigation';
import ClientForm from '../components/ClientForm';
import {addClient} from '@/app/lib/clients';

export default function AddClientPage(){
    const router = useRouter();

    const handleSubmit = async(values) =>{
        console.log(values);
        try{
            const data = await addClient(values);
            alert('Cliente añadido correctamente');
            router.push('/pages/dashboard/clients');
        }catch(error){
            console.error(error);
            alert('Error al añadir cliente');
        }
    }

    return(
        <>
            <button className='blue-button' onClick={()=>router.push('/pages/dashboard/clients')}>Go back</button>
            <ClientForm initialValues={{name:'', cif:'', street:'', number:'', postal:'', city:'', province:''}} onSubmit={handleSubmit} title='Add Client' isEdit={false}/>
        </>
    )
}