'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectDetails from '@/app/pages/dashboard/projects/components/ProjectDetails';
import ProjectList from '@/app/pages/dashboard/projects/components/ProjectsList';
import NoProyectsPlaceHolder from '@/app/pages/dashboard/projects/components/NoProyectsPlaceHolder';

export default function Projects(){
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async() =>{
            try{
                const response = await fetch('/api/projects/getProjects');
                if(!response.ok){
                    throw new Error('Error en la petición');
                }

                const result = await response.json();
                if(result.success){
                    setProjects(result.data);
                }
            }catch(error){
                console.error(error.message);
            }finally{
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleAddProject = () => {
        router.push('/pages/dashboard/projects/addProject');
    }

    return(
        <div className="animate fade-in-up min-h-screen animate-fade-in-up">
        <div className="grid grid-cols-3 gap-4 p-8">
          {/* columna izquierda */}
          <div className="col-span-2">
            <h1 className="text-centefr text-[65px] font-bold text-black mb-3">
              Projects
            </h1>
  
            {projects.length > 0 ? projects.map((project) =>{ return(<p key={project.id}>project.name</p>)}): (null)}

            {loading ? (
              <div className="flex justify-center items-center h-[400px]">
                <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            ) : projects.length > 0 ? (
              <ProjectList projects={projects} onSelectProject={setSelectedProject} onAddProject={handleAddProject} />
            ) : (
              <NoProyectsPlaceHolder onAddProject={handleAddProject} />
            )} 
          </div>
  
  
          {/* columna derecha */}
          {loading ? (null) :
            <>
              {projects.length > 0 ? (
                <div className="col-span-1">
                    {/* <ProjectDetails projects={projects} /> */}
                    <p>project details</p>
                  {/* <ClientDetails client={selectedClient} /> */}
                </div>
              ) : (
                // <PlaceHolderItemsAddClient />

                <p>nothin</p>
              )}
            </>
          }
  
        </div>
      </div>
    )
}