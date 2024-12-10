'use client';
import { useParams, useRouter } from 'next/navigation';
import { useProjectDetails } from '@/app/hooks/useProjectDetails';
import ProjectForm from '@/app/pages/dashboard/projects/components/ProjectForm';
import { deleteProject, updateProject } from '@/app/lib/projects';
import Loading from '@/app/components/Loading';
import SuccessModal from '@/app/components/SuccessModal';
import { useState } from 'react';

export default function ProjectDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { project, client, error, loading } = useProjectDetails(id);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      setSuccessMessage('Project deleted successfully');
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdate = async (values) => {
    try {
      await updateProject(id, values);
      setSuccessMessage('Project updated successfully');
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    if (successMessage.includes('deleted')) {
      router.push('/pages/dashboard/projects');
    }
  };

  return (
    loading ? (
      <Loading />
    ) : (
      <div className="p-8">
        <ProjectForm
          initialValues={project}
          onSubmit={handleUpdate}
          title="Edit Project"
          isEdit={true}
          onDelete={handleDelete}
          client={client}
        />
        {showSuccessModal && (
          <SuccessModal
            message={successMessage}
            buttonText={successMessage.includes('deleted') ? 'Go to Projects' : 'Close'}
            onClose={handleCloseModal}
            redirectPath='/pages/dashboard/projects'
          />
        )}
      </div>
    )
  );
}
