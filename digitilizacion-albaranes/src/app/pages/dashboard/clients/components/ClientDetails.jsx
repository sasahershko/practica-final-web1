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

  return (
    <div className='space-y-6'>
      <div className=' '>
        <Card title={<h1 className='text-blue-700 text-[50px] font-sour-gummy mb-6'>{client.name}</h1>}>
        <div className="p-6 bg-white shadow rounded-lg text-black">
            <h2 className="text-xl font-bold mb-4">Client Details</h2>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-semibold w-32">Name:</span>
                <span>{client.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">CIF:</span>
                <span>{client.cif}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">Address:</span>
                <span>{client.address.street}, {client.address.number}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">City:</span>
                <span>{client.address.city}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">Province:</span>
                <span>{client.address.province}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">Postal Code:</span>
                <span>{client.address.postal}</span>
              </div>
            </div>
          </div>


          <button className='blue-button w-full mt-5' onClick={() => router.push(`/pages/dashboard/clients/${client._id}`, { state: client })}>
            Edit
          </button>
        </Card>
      </div>

      <div className=''>
        <Card title="Projects">
          <div className='grid grid-col-1'>
            <button className='blue-button mx-auto' onClick={() => router.push('/pages/dashboard/projects')}>
              Add project
            </button>
          </div>
        </Card>
      </div>


    </div>
  );
}
