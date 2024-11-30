'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProjectForm from '@/app/pages/dashboard/projects/components/ProjectForm';

///quiero info del proyexto y del cliente
import { getProjectById, deleteProject } from '@/app/lib/projects';
import { getClientById } from '@/app/lib/clients';

export default function ProjectDetails(){
    const {id} = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [project, setProject] = useState(null);
    const [client, setClient] = useState(null);
    
    useEffect(()=>{
      const fetchProjectAndClient = async() =>{
        try{
          const projectData = await getProjectById(id);
          setProject({
            name: projectData.name || '',
            email: projectData.email || '',
            projectCode: projectData.projectCode || '',
            street: projectData.address?.street || '',
            number: projectData.address?.number || '',
            postal: projectData.address?.postal || '',
            city: projectData.address?.city || '',
            province: projectData.address?.province || '',
            code: projectData.code || '',
            clientId: projectData.clientId || '',
        });
        console.log('Datos del proyecto:', projectData);
console.log('Dirección:', projectData.address.street);

          //cliente asociado
          const clientId = project.clientId;
          if(clientId){
            const clientData = await getClientById(clientId);
            setClient(clientData);
          }else{
            setClient(null);
          }

        }catch(error){
          setError(error.message);
        }finally{
          setLoading(false);
        }
      }
      
      fetchProjectAndClient();
    },[id]);

    const handleDelete  = async() =>{
      try{
        const response = await deleteProject(id);
        alert('Project deleted');
        router.push('/pages/dashboard/projects');
      }catch(error){
        console.error(error.message);
        setError(error.message);
      }
    }

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
          client={client}
        />
      </div>
    )
}
