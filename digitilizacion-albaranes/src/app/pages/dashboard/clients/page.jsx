'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientList from './components/ClientList';
import ClientDetails from './components/ClientDetails';
import NoClientsPlaceholder from './components/NoClientsPlaceHolder';
import PlaceHolderItemsAddClient from './components/PlaceHolderItemsAddClient';
import {getClients} from '@/app/lib/clients';

export default function ClientPage() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await getClients();
        setClients(clients);
        setLoading(false);
      }catch(error){
        console.error(error);
        setLoading(false);
      }
    };

    fetchClients();

  }, []);

  const handleAddClient = () => {
    router.push('/pages/dashboard/clients/addClient');
  };

  return (
    <div className="animate fade-in-up min-h-screen animate-fade-in-up">
      <div className="grid grid-cols-3 gap-4 p-8">
        {/* columna izquierda */}
        <div className="col-span-2">
          <h1 className="text-centefr text-[65px] font-bold text-black mb-3">
            Clients
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : clients.length > 0 ? (
            <ClientList clients={clients} onSelectClient={setSelectedClient} onAddClient={handleAddClient} />
          ) : (
            <NoClientsPlaceholder onAddClient={handleAddClient} />
          )}
        </div>


        {/* columna derecha */}
        {loading ? (null) :
          <>
            {clients.length > 0 ? (
              <div className="col-span-1">
                <ClientDetails client={selectedClient} />
              </div>
            ) : (
              <PlaceHolderItemsAddClient />
            )}
          </>
        }

      </div>
    </div>
  );
}
