'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useProjectDetails } from '@/app/hooks/useProjectDetails';
import { getDeliveryNotesByProjectId } from '@/app/lib/deliveryNotes';
import Card from '@/app/components/Card';
import { useEffect } from 'react';
import Loading from '@/app/components/Loading';


export default function Home() {
    const { id } = useParams();
    const { project, loading, error, client } = useProjectDetails(id);
    const router = useRouter();
    const [deliveryNotes, setDeliveryNotes] = useState({});

    useEffect(() => {
        const fetchDeliveryNotes = async () => {
            try {
                const notes = await getDeliveryNotesByProjectId(id);
                setDeliveryNotes(notes);
            } catch (error) {
                console.error('Error al obtener delivery notes:', error);
            }
        };

        fetchDeliveryNotes();
    }, [id])


    if (error) return <p>Error: {error}</p>;

    return (
        loading ? (<Loading />) : (
            <div className='p-4 space-y-8 animate-fade-in-up'>
                <button className='blue-button' onClick={() => router.push('/pages/dashboard/projects')}>Go back to Projects</button>
                <h1 className='main-title-gradient  text-[100px]'>
                    {project?.name || 'No Project Found'}
                </h1>
                <div className='grid grid-cols-3 gap-8 text-black'>
                    <div className='col-span-2'>
                        <Card title={<span className='text-[30px]'>{`Project Details`}</span>}>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-gray-500 font-medium'>Project Code</label>
                                    <p className='bg-gray-100 p-2 rounded-lg'>{project?.projectCode || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className='block text-gray-500 font-medium'>Code</label>
                                    <p className='bg-gray-100 p-2 rounded-lg'>{project?.code || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className='block text-gray-500 font-medium'>Begin</label>
                                    <p className='bg-gray-100 p-2 rounded-lg'>{project?.begin || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className='block text-gray-500 font-medium'>End</label>
                                    <p className='bg-gray-100 p-2 rounded-lg'>{project?.end || 'N/A'}</p>
                                </div>
                                <div className='col-span-2'>
                                    <label className='block text-gray-500 font-medium'>Notes</label>
                                    <p className='bg-gray-100 p-2 rounded-lg'>{project?.notes || 'N/A'}</p>
                                </div>
                                <div className='col-span-2'>
                                    <label className='block text-gray-500 font-medium'>Address</label>
                                    <p className='bg-gray-100 p-2 rounded-lg'>
                                        {`${project?.street || 'N/A'}, ${project?.number || 'N/A'}, 
                                    ${project?.postal || 'N/A'}, ${project?.city || 'N/A'}, 
                                    ${project?.province || 'N/A'}`}
                                    </p>
                                </div>

                            </div>
                            <div className='mt-6 text-right'>
                                <button className='blue-button'
                                    onClick={() => router.push(`/pages/dashboard/projects/${id}/editProject`)}>
                                    Edit
                                </button>
                            </div>
                        </Card>
                    </div>


                    <div className='col-span-1'>
                        <Card title={<span className='text-[30px]'>{`Client Details`}</span>}>
                            <div className='space-y-4 text-black'>
                                <div>
                                    <label className='block text-gray-500 font-medium'>Name</label>
                                    <p className='bg-gray-100 p-2 rounded-lg'>{client?.name || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className='block text-gray-500 font-medium'>CIF</label>
                                    <p className='bg-gray-100 p-2 rounded-lg'>{client?.cif || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className='block text-gray-500 font-medium'>Address</label>
                                    <p className='bg-gray-100 p-2 rounded-lg'>
                                        {`${client?.address?.street || 'N/A'}, ${client?.address?.number || 'N/A'}, 
                                    ${client?.address?.postal || 'N/A'}, ${client?.address?.city || 'N/A'}, 
                                    ${client?.address?.province || 'N/A'}`}
                                    </p>
                                </div>
                                {client?.logo && (
                                    <div>
                                        <label className='block text-gray-500 font-medium'>Logo</label>
                                        <img
                                            src={client.logo}
                                            alt={`${client.name} logo`}
                                            className='w-24 h-auto mt-2 rounded-md'
                                        />
                                    </div>
                                )}

                                <div className='mt-6 text-right'>
                                    <button className='blue-button'
                                        onClick={() => router.push(`/pages/dashboard/clients/${client._id}`)}>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <Card title={<span className="text-[30px]">{`Delivery Notes`}</span>}
                    action={
                        <button
                            className="blue-button"
                            onClick={() => router.push(`/pages/dashboard/projects/${id}/addDeliveryNote`)}
                        >
                            Add Note
                        </button>}>
                    {deliveryNotes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {deliveryNotes.map((note, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="border border-blue-300 bg-white shadow-md hover:shadow-lg p-4 rounded-lg text-black transform hover-grow"
                                        onClick={() => router.push(`/pages/dashboard/deliveryNotes/${note._id}`)}
                                    >
                                        <h3 className="text-lg font-semibold text-blue-600">{note.description}</h3>
                                        <p className="text-gray-700 mt-2">{note._id}</p>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-40">
                            <p className="text-blue-700 text-lg border border-blue-300 bg-blue-50 p-4 rounded-lg shadow-md">
                                No delivery notes available.
                            </p>
                        </div>
                    )}

                </Card>
            </div>
        )
    );
}
