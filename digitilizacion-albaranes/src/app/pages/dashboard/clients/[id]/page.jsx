'use client'
import {useEffect, useState} from 'react';
import {useRouter, useParams} from 'next/navigation';



export default function ClientDetails(){
    const {id} = useParams();
    const [client, setClient] = useState(null);
    const [error, setError] = useState(false);


    useEffect(() =>{
        const fetchClientDetails= async() =>{
            const response = await fetch(`/api/getClient/${id}`);

            if(!response.ok){
                throw new Error('Error al obtener cliente');
            }

            const result = await response.json();
            if(result.success){
                setClient(result.data);
            }else{
                console.error(result.message);
            }
        };

        fetchClientDetails();

    }, [id]);

    return(
        <div className='p-8'>
         <p><strong>Nombre:</strong> {client.name}</p>
            <p><strong>CIF:</strong> {client.cif}</p>
            <p><strong>Dirección:</strong> {client.address.street}, {client.address.number}</p>
            <p><strong>Ciudad:</strong> {client.address.city}</p>
            <p><strong>Provincia:</strong> {client.address.province}</p>
            <p><strong>Código Postal:</strong> {client.address.postal}</p>
        </div>
    )

}