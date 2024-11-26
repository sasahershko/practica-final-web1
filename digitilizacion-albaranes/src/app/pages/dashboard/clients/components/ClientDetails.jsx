'use client';
import React from 'react';
import Card from '../../../../components/Card';
import { useRouter } from 'next/navigation';

export default function ClientDetails({ client }) {
  const router = useRouter();

  if (!client) {
    return (
      <Card title="Client not selected">
        <p className="p-4 text-gray-500">Select a client to see its details.</p>
      </Card>
    );
  }

  const handleDelete = async () => {
    try {
      console.log('ya lo haré');
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className='space-y-6'>
      <div className='selected-card '>
       <Card title={<span>Details of <span className='text-blue-700'>{client.name}</span></span>}>
          <div className="p-4 text-black">
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>CIF:</strong> {client.cif}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Address:</strong> {client.address.street}, {client.address.number}</p>
            <p><strong>City:</strong> {client.address.city}</p>
            <p><strong>Province:</strong> {client.address.province}</p>
            <p><strong>Postal Code:</strong> {client.address.postal}</p>
          </div>

          <button className='nav-button w-full' onClick={()=> router.push(`/pages/dashboard/clients/${client._id}`, {state: client})}>
            EDIT
          </button>
        </Card>
      </div>

      <div className='selected-card'>
        <Card title="Projects">
          <div className='grid grid-col-1'>
            <button className='nav-button mx-auto' onClick={() => router.push('/pages/dashboard/projects')}>
              Add project
            </button>
          </div>
        </Card>
      </div>


    </div>
  );
}
