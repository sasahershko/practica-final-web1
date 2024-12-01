'use client';
import { useParams, useRouter } from 'next/navigation';
import { useProjectDetails } from '@/app/hooks/useProjectDetails';
import Card from '@/app/components/Card';

export default function Home() {
    const { id } = useParams();
    const { project, loading, error, client } = useProjectDetails(id);
    const router = useRouter();

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
            </div>
        );
    }
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='p-8 space-y-8'>
            <button className='blue-button' onClick={()=>router.push('/pages/dashboard/projects')}>Go back to Projects</button>
            <h1 className='bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient-move text-center text-[100px] font-bold'>
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
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600'
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
                        </div>
                    </Card>
                </div>
            </div>
            <Card title={<span className="text-[30px]">{`Delivery Notes`}</span>}>
                <div className="space-y-4">
                    <p className="border border-blue-300 p-2 rounded-lg text-blue-950">No delivery notes available.</p>
                </div>
            </Card>
        </div>
    );
}
