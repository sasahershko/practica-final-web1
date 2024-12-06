'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ClientForm from '../components/ClientForm';
import {getClientById, updateClient, deleteClient, uploadLogo} from '@/app/lib/clients';

export default function EditClientPage() {
  const { id } = useParams();
  const router = useRouter();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //función para cargar los datos del cliente
  useEffect(() => {
    const fetchClient = async () => {
        try {
            const data = await getClientById(id);
            setClient({
                name: data.name || '',
                cif: data.cif || '',
                street: data.address?.street || '',
                number: data.address?.number || '',
                postal: data.address?.postal || '',
                city: data.address?.city || '',
                province: data.address?.province || '',
            });
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
        await updateClient(id, values); 
        alert('Cliente actualizado correctamente.');
    } catch (err) {
        setError(err.message);
    }
};

const handleDelete = async() =>{
    try {
        await deleteClient(id);
        alert('Cliente eliminado correctamente.');
        router.push('/pages/dashboard/clients');
    } catch (err) {
        setError(err.message);
    }
};

const handleLogo = async(image) =>{
  try{
    const formData = new FormData();
    console.log(image);
    formData.append('image', image, image.name);

    console.log('image: ', image, 'formData: ', image, 'name; ', image.name);
    console.log('FORMDATA: ', formData);

    await uploadLogo(id, formData);
    alert('Logo actualizado correctamente.');
  } catch (err) {
    // setError(err.message);
    alert('Error al actualizar el logo.');
  }
}


  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <button className='blue-button' onClick={() => router.push('/pages/dashboard/clients')}>Go back</button>
      <ClientForm
        initialValues={client}
        onSubmit={handleUpdate}
        onSubmitLogo={handleLogo}
        title="Edit Client"
        isEdit={true}
        onDelete={handleDelete}
      />
    </div>
  );
}
