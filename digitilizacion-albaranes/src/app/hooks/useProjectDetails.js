import { useEffect, useState } from 'react';
import { getProjectById } from '@/app/lib/projects';
import { getClientById } from '@/app/lib/clients';

export function useProjectDetails(projectId) {
  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectAndClient = async () => {
      try {
        const projectData = await getProjectById(projectId);
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

        if (projectData.clientId) {
          const clientData = await getClientById(projectData.clientId);
          setClient(clientData);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectAndClient();
    }
  }, [projectId]);

  return { project, client, error, loading };
}
