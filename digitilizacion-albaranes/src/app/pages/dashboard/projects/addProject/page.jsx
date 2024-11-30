'use client';
import ProjectForm from '../components/ProjectForm';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProject(){
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchClients = async () => {
          try {
            const response = await fetch('/api/clients/getClient');
            if (!response.ok) {
              throw new Error('Error en la petición');
            }
    
            const result = await response.json();
            if (result.success) {
              setClients(result.data);
            }
          } catch (err) {
            console.error(err.message);
          } finally {
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