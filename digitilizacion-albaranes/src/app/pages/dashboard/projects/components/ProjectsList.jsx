'use client';
import Card from '@/app/components/Card';

export default function ProjectList({projects, onSelectProject, onAddProject}){
    return(
        <div className='grid grid-col-1'>
            <button className='blue-button mb-5' onClick={onAddProject}>
                Add project
            </button>

            <div>
              {projects.map((project, index) =>(
                <div key={`${project._id}`} onClick={()=>onSelectProject(project)}>
                    <Card>
                        <h2 key={project._id}>{project.name}</h2>
                    </Card>
                </div>
              ))}  
            </div>
        </div>
    )
}