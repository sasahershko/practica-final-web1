    // const deleteAccount = async() =>{
    //     const token = localStorage.getItem('jwt');
    //     if(!token){
    //         alert('NO HAY TOKEN');
    //         return;
    //     }
    //     console.log('TOKEN: ', token);

    //     try{

    //         const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user', {
    //             method: 'DELETE',
    //             headers:{
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNmMGZjNDllZTI4YmUyMzY5Y2RhZDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzIyMTM5ODQsImV4cCI6MTczNDgwNTk4NH0.xrI_GpPHVgcvtYSL-hJ8cE5gCDXOcQApLSVR28uratE`
    //             },
    //         })

    //         if(response.ok){
    //             const data = await response.json();
    //             console.log('Usuario eliminado', data);
    //             alert('USUARIO ELIMINADO CORRECTAMENTE.');
    //         }

    //     }catch(error){
    //         console.error('Error al eliminar el usuario: ', error.message);
    //     }
    // };