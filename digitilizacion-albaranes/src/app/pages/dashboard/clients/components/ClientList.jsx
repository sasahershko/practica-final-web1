'use client';
import React from 'react';
import { useEffect, useState, useRef } from 'react';

export default function ClientList({ clients, onSelectClient, onAddClient }) {
  const [visibleClients, setVisibleClients] = useState([]);
  //esto es para saber si el userEffect se ha ejecutado, esto es porque se ejcuta 2 veces no sé por qué
  // const isFirstRun = useRef(true);

  useEffect(() => {
    let timeouts = [];

    clients.forEach((client, index) => {
      const timeout = setTimeout(() => {
        setVisibleClients((prev) => [...prev, client]); //añadir cliente al estado
      }, index * 200); 
      timeouts.push(timeout);
    });

    // Limpiar timeouts al desmontar el componente
    return () => timeouts.forEach(clearTimeout);
  }, [clients]);
  
  return (
    <div className="grid grid-col-1">
      <button className="blue-button mb-5" onClick={onAddClient}>
        Add Client
      </button>
      <ul className="space-y-2">
        {clients.map((client, index) => (
          <li
            key={client.id}
            className="bg-white shadow rounded-lg p-4 text-black font-semibold transform transition-all ease-in-out duration-300 hover:scale-101 hover:bg-blue-100 hover:scale- animate-fade-in-up"
            onClick={() => onSelectClient(client)}
            style={{ animationDelay: `${index * 200}ms` }} 
          >
            {client.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
