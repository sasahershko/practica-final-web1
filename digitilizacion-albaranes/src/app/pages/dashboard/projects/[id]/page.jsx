'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProjectForm from '@/app/pages/dashboard/projects/components/ProjectForm';

export default function ProjectDetails(){
    const {id} = useParams();
    const router = useRouter();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchClient = async () => {
          try {
            const response = await fetch(`/api/clients/getProject/${id}`);
            if (!response.ok) {
              throw new Error('Error al cargar los datos del project.');
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
              throw new Error(result.message || 'Proyecto no encontrado.');
            }
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchClient();
      }, [id]);

    const handleDelete = async() =>{
        try{
            const response = await fetch(`/api/projects/deleteProject/${id}`, {
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
            });

            if(!response.ok){
                throw new Error('Error en la petición');
            }

            const result = await response.json();

            if(result.success){
                alert('Project deleted');
                router.push('/pages/dashboard/projects');
            }
        }catch(error){
            console.error(error.message);
        }
    };

    const handleUpdate = async(values) =>{

        try{
            const response = await fetch(`/api/projects/updateProject/${id}`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(values)
            });

            if(!response.ok){
                throw new Error('Error en la petición');
            }

            const result = await response.json();

            if(result.success){
                alert('Project updated');
                router.push('/pages/dashboard/projects');
            }
        }catch(error){
            console.error(error.message);
            setError(error.message);
        }
        // finally{
        //     setLoading(false);
        // }
    }

    return(
        <div className="p-8">
        <ProjectForm
          initialValues={project} 
          onSubmit={handleUpdate}
          title="Edit Project" 
          isEdit={true}
          onDelete={handleDelete}
        />
      </div>
    )
}
