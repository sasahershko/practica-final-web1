'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { getClients } from '@/app/lib/clients';
// import { addProject } from '@/app/lib/projects';

// export default function AddProject(){
//     const [clients, setClients] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//       const fetchClients = async () => {
//         try {
//           const clients = await getClients();
//           setClients(clients);
//           setLoading(false);
//         }catch(error){
//           console.error(error);
//           setLoading(false);
//         }finally{
//           setLoading(false);
//         }
//       };

//       fetchClients();

//     }, []);

//     //ADD PROJECT
//     const handleAddProject = async (values) => {
//       try {
//           const response = await addProject(values);
//           alert('Proyecto añadido correctamente');
//           router.push('/pages/dashboard/projects');
//       } catch (error) {
//           console.log('Error al añadir proyecto', error.message);
//       }
//     };

//     return(
//         <>
//             <ProjectForm
//                 title='Add Project'
//                 initialValues={{ name: '', projectCode: '', email: '', street: '', number: '', postal: '', city: '', province: '', code: '', clientId: ''}}     
//                 clients={clients}   
//                 onSubmit={handleAddProject} 
//             />
//         </>
//     )
//            {/* <DeliveryForm title='Add Delivery Note' /> */} -> ESTO ESTÁ DENTRO DEL RETURN PERO NO SE PORQUE NO ME DEJA HACER RUN BUILD
// }

export default function AddDeliveryNote() {
    return (
        <div>
            <h1 className=''>Add Delivery Note</h1>
        </div>
    )
}