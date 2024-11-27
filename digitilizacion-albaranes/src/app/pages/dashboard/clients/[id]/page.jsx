'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ClientForm from '../components/ClientForm'; 

export default function EditClientPage() {
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
