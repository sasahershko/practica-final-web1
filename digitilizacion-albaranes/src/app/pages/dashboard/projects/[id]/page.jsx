'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { getProjectById } from '@/app/lib/projects';

export default function Home() {
    const {id} = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async() =>{
            try{
                const result = await getProjectById(id);
                setProject(result);
            }catch(e){
                console.log(e);
            }
        };

        fetchProject();
        console.log(project);
    }, []);

    return (
        <div>
        <h1 className='text-center text-black text-[80px] animate-fade-in-up font-bold'>a</h1>
        </div>
    );
}