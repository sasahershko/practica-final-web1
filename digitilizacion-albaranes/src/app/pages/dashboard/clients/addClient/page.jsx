'use client'
import {useRouter} from 'next/navigation';
import ClientForm from '../components/ClientForm';

export default function AddClientPage(){
    const router = useRouter();

    const handleSubmit = async(values) =>{
        try{
            const response = await fetch('/api/clients/addClient', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const result = await response.json();

            if(result.success){
                alert('Cliente añadido correctamente');
                router.push('/pages/dashboard/clients');
            }else{
                alert('Error al añadir cliente', result.message);
            }

        }catch(error){
            console.log('Error al añadir cliente', error.message);
        }
    }

    return(
        <>
            <button className='blue-button' onClick={()=>router.push('/pages/dashboard/clients')}>Go back</button>
            <ClientForm initialValues={{name:'', cif:'', street:'', number:'', postal:'', city:'', province:''}} onSubmit={handleSubmit} title='Add Client' isEdit={false}/>
        </>
    )
}