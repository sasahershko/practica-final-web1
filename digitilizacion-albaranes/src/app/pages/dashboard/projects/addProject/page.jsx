'use client';
import ProjectForm from '../components/ProjectForm';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getClients } from '@/app/lib/clients';
import { addProject, updateProject } from '@/app/lib/projects';
import Modal from '@/app/components/Modal';
import DateForm from '@/app/pages/dashboard/projects/components/DateForm';

export default function AddProject() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [project, setProject] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await getClients();
        setClients(clients);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  //ADD PROJECT
  const handleAddProject = async (values) => {
    try {
        const response = await addProject(values);
        alert('Proyecto añadido');
        setIsModalOpen(true);
        setProject(response);
    } catch (error) {
        console.error('Error al añadir proyecto:', error.message);
    }
};


  const handleUpdateDates = async (values) => {
    try {
      const response = await updateProject(project._id, values);
      alert('Project dates updated successfully!', project._id, values);
      setIsModalOpen(false);
      router.push('/pages/dashboard/projects');
    } catch (error) {
      console.log('Error updating project dates', error.message);
    }

  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/pages/dashboard/projects');
  };

  return (
    <>
      <ProjectForm
        title='Add Project'
        initialValues={{ name: '', projectCode: '', email: '', street: '', number: '', postal: '', city: '', province: '', code: '', clientId: '' }}
        clients={clients}
        onSubmit={handleAddProject}
      />

      {isModalOpen && (
        <Modal
          title="Set Project Dates"
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          children={
            <>
            <DateForm
              onSubmit={handleUpdateDates}
              projectName={project.name}
            />
            </>
          }
        />
      )}
    </>
  )
}