'use client';
import ProjectForm from "@/app/pages/dashboard/projects/components/ProjectForm";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getClientById, getClients } from '@/app/lib/clients';

export default function AddProjectForClient({ params }) {
  const { id: clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
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

  return (
    <div>
      <ProjectForm initialValues={{
        clientId: clientId,
      }}
        title='Add Project'
        client={client} />
    </div>
  )
}