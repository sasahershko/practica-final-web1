'use client';
import ProjectForm from "@/app/pages/dashboard/projects/components/ProjectForm";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getClients } from '@/app/lib/clients';

export default function AddProjectForClient({ params }) {
  const { id: clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientData = await getClients();
        setClient({
          name: result.data.name || '',
          cif: result.data.cif || '',
          street: result.data.address?.street || '',
          number: result.data.address?.number || '',
          postal: result.data.address?.postal || '',
          city: result.data.address?.city || '',
          province: result.data.address?.province || '',
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();

  }, [])

  return (
    <div>
      <ProjectForm initialValues={{
        clientId: clientId,
        email: '',
        name: '',
        street: '',
        number: '',
        postal: '',
        city: '',
        province: '',
        code: ''
      }}
        title='Add Project'
        client={client} />
    </div>
  )
}