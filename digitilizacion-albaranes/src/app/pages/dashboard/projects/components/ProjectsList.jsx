'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card';
import Modal from '@/app/components/Modal';
import { updateProject } from '@/app/lib/projects';

export default function ProjectList({ projects, onSelectProject, onAddProject }) {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  //ESTO ES PARA LA ANIMACIÓN
  useEffect(() => {
    //filtra proyectos duplicados al inicio
    const uniqueProjects = projects.filter(
      (project, index, self) =>
        index === self.findIndex((p) => p._id === project._id)
    );

    setVisibleProjects([]);
    let timers = [];

    uniqueProjects.forEach((project, index) => {
      const timer = setTimeout(() => {
        setVisibleProjects((prev) => {
          //verifico que no se agregue un proyecto duplicado
          if (prev.some((p) => p._id === project._id)) return prev;
          return [...prev, project];
        });
      }, index * 100);//retraso 100ms
      timers.push(timer);
    });
    return () => {
      timers.forEach((timer) => clearTimeout(timer)); //limpia temporizadores
    };
  }, [projects]);

  const handleProjectClick = (project) => {
    //antes puse un modal pero creo que lo que voy a hacer es abrir una nueva página
    // setIsModalOpen(true);
    // setSelectedProject(project);
    router.push(`/pages/dashboard/projects/${project._id}`);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }

  return (
    <div>
      <button className="blue-button mb-5" onClick={onAddProject}>
        Add Project
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleProjects.map((project) => (
          <div
            key={project._id}
            className="animate-fade-in-up'"
            onClick={() => handleProjectClick(project)}
          >
            <div className='hover-grow'>
            <Card>
              <h2 className="text-[40px] font-bold text-black">{project.name}</h2>
              <p className="text-sm text-gray-500"><strong>Notes: </strong><span className='text-blue-300'>{project.notes}</span></p>
            </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
