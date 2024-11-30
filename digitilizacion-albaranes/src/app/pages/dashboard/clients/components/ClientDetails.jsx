'use client';
import React, { useEffect, useState } from 'react';
import Card from '../../../../components/Card';
import { useRouter } from 'next/navigation';
import { getProjectByClientId } from '@/app/lib/projects';

export default function ClientDetails({ client }) {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!client) return; 

      try {
        const projectsData = await getProjectByClientId(client._id); // Llama a la API
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [client]);

  if (!client) {
    return (
      <Card title="Client not selected">
        <p className="p-4 text-gray-500">Select a client to see its details.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Detalles del cliente */}
      <div className="">
        <Card title={<span className="text-blue-700 text-[70px] font-jaro mb-6">{client.name}</span>}>
          <div className="p-6 bg-white shadow rounded-lg text-black">
            <div className="grid grid-cols-2">
              <h2 className="text-xl font-bold mb-4">Client Details</h2>
              <img
                src="https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg"
                width={200}
                height={200}
                alt="client"
              />
            </div>

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
                <span>
                  {client.address.street}, {client.address.number}
                </span>
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

          <button
            className="blue-button w-full mt-5"
            onClick={() => router.push(`/pages/dashboard/clients/${client._id}`)}
          >
            Edit
          </button>
        </Card>
      </div>

      <div className="">
        <Card title="Projects">
          <div className=''>
            <button
              className="blue-button mx-auto w-full mb-4"
              onClick={() => router.push(`/pages/dashboard/clients/${client._id}/addProject`)}
            >
              Add project
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[100px]">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : projects.length > 0 ? (
            <ul className='animate-fade-in-up'>
              {projects.map((project) => (
                <li key={project._id}>
                  <div className="p-4 border rounded mb-2 text-black transition-transform duration-300 hover:scale-105"
                        onClick={()=>router.push(`/pages/dashboard/projects/${project._id}`)}>
                    <h3 className="font-bold">{project.name}</h3>
                    <p>{project.description || 'No description'}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-center text-red-400 animate-fade-in-up'>No projects found for this client.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
