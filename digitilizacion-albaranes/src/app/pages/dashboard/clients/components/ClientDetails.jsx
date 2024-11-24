'use client';
import React from 'react';
import Card from '../../../../components/Card';

export default function ClientDetails({ client }) {
  if (!client) {
    return (
      <Card title="Client not selected">
        <p className="p-4 text-gray-500">Select a client to see its details.</p>
      </Card>
    );
  }

  return (
    <div className='selected-card'>
    <Card title={`Details of ${client.name}`}>
      <div className="p-4 text-black">
        <p><strong>Name:</strong> {client.name}</p>
        <p><strong>CIF:</strong> {client.cif}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Address:</strong> {client.address.street}, {client.address.number}</p>
        <p><strong>City:</strong> {client.address.city}</p>
        <p><strong>Province:</strong> {client.address.province}</p>
        <p><strong>Postal Code:</strong> {client.address.postal}</p>
      </div>
      <button className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out">
        DELETE CLIENT
      </button>
    </Card>
    </div>
  );
}
