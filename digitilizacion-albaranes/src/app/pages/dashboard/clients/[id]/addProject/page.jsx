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
        setClient({
          name: clientData.name || '',
          cif: clientData.cif || '',
          street: clientData.address?.street || '',
          number: clientData.address?.number || '',
          postal: clientData.address?.postal || '',
          city: clientData.address?.city || '',
          province: clientData.address?.province || '',
        });
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