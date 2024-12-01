'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProjectForm from '@/app/pages/dashboard/projects/components/ProjectForm';

///quiero info del proyexto y del cliente
import { getProjectById, deleteProject, updateProject } from '@/app/lib/projects';
import { getClientById } from '@/app/lib/clients';

export default function ProjectDetails(){
    const {id} = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [project, setProject] = useState(null);
    const [client, setClient] = useState(null);
    const [clientId, setClientId] = useState(null);
    
    useEffect(() => {
      const fetchProject = async () => {
        try {
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
            notes: projectData.notes || '',
          });

          //para separarlo del fetch del project
          setClientId(projectData.clientId || null);

        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProject();
    }, [id]);
  

    useEffect(() => {
      if (clientId) {
        const fetchClient = async () => {
          try {
            const clientData = await getClientById(clientId);
            setClient(clientData);
          } catch (error) {
            setError(error.message);
          }
        };
  
        fetchClient();
      }
    }, [clientId]);

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
        const response = await updateProject(id, values);
        alert('Project updated');
      }catch(error){
        console.error(error.message);
        setError(error.message);
      }
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
