'use client';
import ProjectForm from "../../../projects/components/ProjectForm";
import { useEffect, useState } from 'react';

export default function AddProjectForClient({params}){
    const {id} = params;
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
          try {
            const response = await fetch(`/api/clients/getClient/${id}`); 
            if (!response.ok) {
              throw new Error('Error al cargar los datos del cliente.');
            }
    
            const result = await response.json();
    
            if (result.success) {
              setClient({
                name: result.data.name || '',
                cif: result.data.cif || '',
                street: result.data.address?.street || '',
                number: result.data.address?.number || '',
                postal: result.data.address?.postal || '',
                city: result.data.address?.city || '',
                province: result.data.address?.province || '',
              });
            } else {
              throw new Error(result.message || 'Cliente no encontrado.');
            }
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchClient();
      }, []);

    return(
        <div>
            <ProjectForm initialValues={{
                clientId:id,
                email:'',
                name:'',
                street:'',
                number:'',
                postal:'',
                city:'',
                province:'',
                code:''
            }} 
            title='Add Project'
            client={client}/>
        </div>
    )
}