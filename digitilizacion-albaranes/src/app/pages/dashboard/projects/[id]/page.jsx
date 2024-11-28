'use client';
import { useParams, useRouter } from 'next/navigation';

export default function ProjectDetails(){
    const {id} = useParams();
    const router = useRouter();
    
    const handleDelete = async() =>{
        try{
            const response = await fetch(`/api/projects/deleteProject/${id}`, {
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
            });

            if(!response.ok){
                throw new Error('Error en la petición');
            }

            const result = await response.json();

            if(result.success){
                alert('Project deleted');
                router.push('/pages/dashboard/projects');
            }
        }catch(error){
            console.error(error.message);
        }
    }

    return(
        <div>
            <h1 className='text-center font-bold text-black'>Project Details</h1>
            <button className='red-button mt-5' onClick={handleDelete}>DELETE</button>
        </div>
    )
}