import { apiRequest } from './api';

export async function getDeliveryNotes() {
    try{
        const response = await apiRequest('deliverynote', 'GET');
        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message || 'Error al obtener delivery notes');
        }
    }catch(error){
        throw new Error('Error al obtener delivery notes');
    }
};

export async function addDeliveryNote(deliveryNoteData) {
    try {
        console.log('Datos enviados a la API:', deliveryNoteData); // Log para depuración
        const response = await apiRequest('deliverynote', 'POST', deliveryNoteData);
        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message || 'Error al crear delivery note');
        }
    } catch (error) {
        console.error('Error en addDeliveryNote:', error.message);
        throw new Error(error.message);
    }
}



//notas desde un proyecto
export async function getDeliveryNotesByProjectId(projectId){
    try{
        const response = await apiRequest(`deliverynote/project/${projectId}`, 'GET');
        if(response.success){
            return response.data;
        }else{
            throw new Error(response.message || 'Error al obtener notas de entrega');
        }
    }catch(error){
        throw new Error(error.message);
    }

};

export async function getDeliveryNoteById(deliveryNoteId){
    try{
        const response = await apiRequest(`deliverynote/${deliveryNoteId}`, 'GET');
        if(response.success){
            return response.data;
        }else{
            throw new Error(response.message || 'Error al obtener nota de entrega');
        }
    }catch(error){
        throw new Error(error.message);
    }
}

export async function deleteDeliveryNote(deliveryNoteId){
    try{
        const response = await apiRequest(`deliverynote/${deliveryNoteId}`, 'DELETE');
        if(response.success){
            return response.data;
        }else{
            throw new Error(response.message || 'Error al eliminar nota de entrega');
        }
    }catch(error){
        throw new Error(error.message);
    }

};

export async function updateDeliveryNote(deliveryNoteId, deliveryNoteData){
    try{
        const response = await apiRequest(`deliverynote/${deliveryNoteId}`, 'PUT', deliveryNoteData);
        if(response.success){
            return response.data;
        }else{
            throw new Error(response.message || 'Error al actualizar nota de entrega');
        }
    }catch(error){
        throw new Error(error.message);
    }

};