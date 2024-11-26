'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ClientDetails() {
  const { id } = useParams(); 
  const [client, setClient] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/clients/getClient`);
        if (!response.ok) {
          throw new Error('Error en la petición');
        }

        const result = await response.json();
        if (result.success) {
          const foundClient = result.data.find((client) => client._id === id);
          console.log(foundClient);
          if(foundClient){
            setClient(foundClient);
          }else{
            throw new Error('Cliente no encontrado');
          }

        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [id]);

  if (loading) {
    return <div>Cargando datos del cliente...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }


  if (!client || !client.address) {
    return <div>El cliente no tiene datos válidos.</div>;
  }

  return (
    <div className="p-8">
      <p className="text-black text-[30px]"><strong>Nombre:</strong> {client.name}</p>
      <p><strong>CIF:</strong> {client.cif}</p>
      <p><strong>Dirección:</strong> {client.address.street}, {client.address.number}</p>
      <p><strong>Ciudad:</strong> {client.address.city}</p>
      <p><strong>Provincia:</strong> {client.address.province}</p>
      <p><strong>Código Postal:</strong> {client.address.postal}</p>
    </div>
  );
}
