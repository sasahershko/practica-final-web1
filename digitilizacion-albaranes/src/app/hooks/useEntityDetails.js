import { useEffect, useState } from 'react';
import { getProjects } from '@/app/lib/projects';
import { getClients } from '@/app/lib/clients';
import { getDeliveryNotes } from '@/app/lib/deliveryNotes';

export function useProjectDetails(projectId) {
    const [projects, setProjects] = useState(null);
    const [clients, setClients] = useState(null);
    const [deliveryNotes, setDeliveryNotes] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectsDeliveriesAndClients = async () => {

            try{
                const projectsData = await getProjects();
                setProjects(projectsData);
                const clientsData = await getClients();
                setClients(clientsData);
                const deliveryNotesData = await getDeliveryNotes();
                setDeliveryNotes(deliveryNotesData);
            }catch(error){
                setError(error.message);
                console.log(error.message);
            }finally{
                setLoading(false);
            }
        }

        fetchProjectsDeliveriesAndClients();
    }, []);

    return { projects, clients, deliveryNotes, error, loading };
}
