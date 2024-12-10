'use client';
import ProjectForm from '../components/ProjectForm';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getClients } from '@/app/lib/clients';
import { addProject, updateProject } from '@/app/lib/projects';
import Modal from '@/app/components/Modal';
import DateForm from '@/app/pages/dashboard/projects/components/DateForm';
import SuccessModal from '@/app/components/SuccessModal';

export default function AddProject() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

  const handleAddProject = async (values) => {
    try {
      const response = await addProject(values);
      setIsModalOpen(true);
      setProject(response);
    } catch (error) {
      console.error('Error al añadir proyecto:', error.message);
    }
  };

  const handleUpdateDates = async (values) => {
    try {
      await updateProject(project._id, values);
      setIsModalOpen(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.log('Error updating project dates', error.message);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
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
            <DateForm
              onSubmit={handleUpdateDates}
              projectName={project.name}
            />
          }
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          message="Project added and dates updated successfully!"
          buttonText="Go to Projects"
          onClose={handleCloseSuccessModal}
          redirectPath='/pages/dashboard/projects'
        />
      )}
    </>
  );
}
