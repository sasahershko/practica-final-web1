'use client';
import React from 'react';

export default function ClientList({ clients, onSelectClient, onAddClient }) {
  return (
    <div className='grid grid-col-1'>
      <button className="nav-button mb-5" onClick={onAddClient}>
        Add Client
      </button>
      <ul className="space-y-2">
        {clients.map((client) => (
          <li
            key={client.id}
            className='bg-white shadow rounded-lg p-4 text-black font-semibold transform transition-all ease-in-out duration-300 hover:scale-101 hover:bg-blue-100'
            onClick={() => onSelectClient(client)}
          >
            {client.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
