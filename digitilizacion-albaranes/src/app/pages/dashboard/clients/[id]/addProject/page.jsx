'use client';
import ProjectForm from "@/app/pages/dashboard/projects/components/ProjectForm";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getClientById, getClients } from '@/app/lib/clients';
import { addProject } from '@/app/lib/projects';
import SuccessModal from "@/app/components/SuccessModal";

export default function AddProjectForClient({ params }) {
  const { id: clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const clientData = await getClientById(clientId);
        setClient(clientData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [])


  const handleAddProject = async (values) => {
    try {
      const response = await addProject(values);
      setShowModal(true);
    } catch (error) {
      console.error('Error al añadir proyecto:', error.message);
    }
  };

  return (
    <div>
      <ProjectForm initialValues={{ clientId: clientId, }} title='Add Project' client={client} onSubmit={handleAddProject} />

      {showModal && (
        <SuccessModal
          message="User deleted successfully!"
          redirectPath="/pages/dashboard/clients"
          buttonText="Go to Home"
          onClose={() => { setShowModal(false);}}
        />
      )}
    </div>
  )
}