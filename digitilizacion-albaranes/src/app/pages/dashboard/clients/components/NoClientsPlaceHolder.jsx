'use client';
import React from 'react';
import Card from '../../../../components/Card';

export default function NoClientsPlaceholder({ onAddClient }) {
  return (
    <Card title="Create your first Client">
      <div className="text-center">
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVPNgg88GJyAUxmiTI04IhxL-Dle4U4fOHUZPAZo0eNtHm6h4Hjmzhg8dR6euMl_aHcg3YKR8QOwa0WrnjtAMg2Zb1yofw36skG_VAtTMDIOvNNpCCJ_7Uf8vJb5TNjHhYniTM3waJ3DBS6dDDr5l-Avq51y9QKISdz4hnX9aF6MI7O1lvyt6FYKmGXsPk/s900/clientes.gif"
          alt="Image"
          className="mb-8 mx-auto h-[450px] w-[600px] rounded-lg"
        />
        <p className="text-gray-500 mb-8">
          In order to generate digital delivery notes
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onAddClient}
        >
          Yes, let's go!
        </button>
      </div>
    </Card>
  );
}
