'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card';
import Modal from '@/app/components/Modal';

export default function ProjectList({ projects, onSelectProject, onAddProject }) {
    const [visibleProjects, setVisibleProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    //ESTO ES PARA LA ANIMACIÓN
    useEffect(() => {

        //filtra proyectos duplicados al inicio
        const uniqueProjects = projects.filter(
            (project, index, self) =>
                index === self.findIndex((p) => p._id === project._id)
        );

        setVisibleProjects([]);
        let timers = [];

        uniqueProjects.forEach((project, index) => {
            const timer = setTimeout(() => {
                setVisibleProjects((prev) => {
                    //verifico que no se agregue un proyecto duplicado
                    if (prev.some((p) => p._id === project._id)) return prev;
                    return [...prev, project];
                });
            }, index * 100);//retraso 100ms
            timers.push(timer);
        });
        return () => {
            timers.forEach((timer) => clearTimeout(timer)); //limpia temporizadores
        };
    }, [projects]);

    const handleProjectClick = (project) => {
        setIsModalOpen(true);
        setSelectedProject(project);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    }

    // const handleDelete = (project)=>{
    //     setSelectedProject(project);
    //    router.push(`/pages/dashboard/projects/${project._id}`);
    // }

    return (
        <div>
            <button className="blue-button mb-5" onClick={onAddProject}>
                Add Project
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleProjects.map((project) => (
                    <div
                        key={project._id}
                        className="animate-fade-in-up hover-grow"
                        onClick={() => handleProjectClick(project)}
                    >
                        <Card>
                            <h2 className="text-lg font-bold text-black">{project.name}</h2>
                            <p className="text-sm text-gray-500"><strong>Code: </strong>#{project.code}</p>
                            <p className="text-sm text-gray-500"><strong>Client: </strong>{project.clientId}</p>
                            <p className="text-sm text-gray-500"><strong>Status: </strong>{project.status}</p>
                        </Card>
                    </div>
                ))}

                <Modal
                    title={selectedProject?.name}
                    onClose={closeModal}
                    isOpen={isModalOpen}
                    children={
                        <div>
                            <p>Client ID: {selectedProject?.clientId}</p>
                            <p>More details about the project...</p>
                        </div>
                    }
                    object={selectedProject}
                />
            </div>
        </div>
    );
}


function EditClientPage() {
  const { id } = useParams();
  const router = useRouter();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Función para cargar los datos del cliente
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
  }, [id]);


  const handleUpdate = async (values) => {
    try {
      const response = await fetch(`/api/clients/updateClient/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), 
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el cliente.');
      }

      const result = await response.json();

      if (result.success) {
        alert('Cliente actualizado correctamente.');
        router.push('/pages/dashboard/clients'); 
      } else {
        throw new Error(result.message || 'Error desconocido.');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  //PARA ELIMINAR
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/clients/deleteClient/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el cliente');
      }

      const result = await response.json();
      alert('Cliente eliminado correctamente');
      router.push('/pages/dashboard/clients'); 
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando datos del cliente...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <button className='blue-button' onClick={()=>router.push('/pages/dashboard/clients')}>Go back</button>
      <ClientForm
        initialValues={client} 
        onSubmit={handleUpdate}
        title="Edit Client" 
        isEdit={true}
        onDelete={handleDelete}
      />
    </div>
  );
}
