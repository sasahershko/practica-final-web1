'use client';
import { useParams, useRouter } from 'next/navigation';
import { useProjectDetails } from '@/app/hooks/useProjectDetails';
import ProjectForm from '@/app/pages/dashboard/projects/components/ProjectForm';
import { deleteProject, updateProject } from '@/app/lib/projects';

export default function ProjectDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { project, client, error, loading } = useProjectDetails(id);

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      alert('Project deleted');
      router.push('/pages/dashboard/projects');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdate = async (values) => {
    try {
      await updateProject(id, values);
      alert('Project updated');
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading){
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  } 

  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <ProjectForm
        initialValues={project}
        onSubmit={handleUpdate}
        title="Edit Project"
        isEdit={true}
        onDelete={handleDelete}
        client={client}
      />
    </div>
  );
}
