'use client';
import React from 'react';
import { useEffect, useState, useRef } from 'react';

export default function ClientList({ clients, onSelectClient, onAddClient }) {
  const [visibleClients, setVisibleClients] = useState([]);
  //esto es para saber si el userEffect se ha ejecutado, esto es porque se ejcuta 2 veces no sé por qué
  // const isFirstRun = useRef(true);

  useEffect(() => {
    const uniqueClients = clients.filter((project, index, self) => index === self.findIndex((p) => p._id === project._id));
  
    setVisibleClients([]);
    let timers = [];

    uniqueClients.forEach((client, index) => {
      const timer = setTimeout(() => {
        setVisibleClients((prev) => {
          // Evitar duplicados en el estado visibleClients
          if (prev.some((p) => p._id === client._id)) {
            return prev;
          }
          return [...prev, client];
        });
      }, index * 200); // Espaciado entre animaciones
      timers.push(timer);
    });
  
  }, [clients]);
  
  return (
    <div className="grid grid-col-1">
      <button className="blue-button mb-5" onClick={onAddClient}>
        Add Client
      </button>
      <ul className="space-y-2">
        {visibleClients.map((client, index) => (
          <li
            key={client._id}
            className="bg-white shadow rounded-lg p-4 text-black font-semibold hover:bg-blue-100 animate-fade-in-up"
            style={{
              animationDelay: `${index * 200}ms`, // Retrasar la animación
            }}
            onClick={() => onSelectClient(client)}
          >
            {client.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
