'use client';
import ProjectForm from '../components/ProjectForm';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {getClients} from '@/app/lib/clients';

export default function AddProject(){
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const fetchClients = async () => {
        try {
          const clients = await getClients();
          setClients(clients);
          setLoading(false);
        }catch(error){
          console.error(error);
          setLoading(false);
        }finally{
          setLoading(false);
        }
      };
  
      fetchClients();
  
    }, []);

    return(
        <>
            <ProjectForm
                title='Add Project'
                initialValues={{ name: '', projectCode: '', email: '', street: '', number: '', postal: '', city: '', province: '', code: '', clientId: ''}}     
                clients={clients}    
            />
        </>
    )
}