'use client';
import ProjectForm from '../components/ProjectForm';
import { useState, useEffect } from 'react';

export default function AddProject(){
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

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

      const handleSubmitProject= async(values) =>{
        console.log('VALORES:', values);
        try{
          const response = await fetch('/api/projects/addProject', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
          })

        }catch(error){
            console.log('Error al añadir proyecto', error.message);
        }
      }

    return(
        <>
            <ProjectForm
                title='Add Project'
                initialValues={{ name: '', email: '', street: '', number: '', postal: '', city: '', province: '', code: '', clientId: ''}}     
                clients={clients}  
                onSubmit={handleSubmitProject}     
            />
        </>
    )
}