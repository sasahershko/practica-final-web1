import { apiRequest } from './api';

export async function getDeliveryNotes() {
    const response = await apiRequest('deliverynote', 'GET');
    if (response.success) {
        return response.data;
    } else {
        console.log('ERROR DESDE DELIVERYNOTES.JS');
        throw new Error(response.message || 'Error al obtener delivery notes');
    }
};

export async function addDeliveryNote(deliveryNoteData){
    const response = await apiRequest('deliverynote', 'POST');
    if(response.success){
        return response.data;
    }else{
        throw new Error (response.message || 'Error al crear delivery note');
    }
};

//notas desde un proyecto
export async function getDeliveryNotesByProjectId(projectId){
    const response = await apiRequest(`deliverynote/project/${projectId}`, 'GET');
    if(response.success){
        return response.data;
    }else{
        throw new Error(response.message || 'Error al obtener notas de entrega');
    }
};

export async function deleteDeliveryNote(deliveryNoteId){
    const response = await apiRequest(`deliverynote/${deliveryNoteId}`, 'DELETE');
    if(response.success){
        return response.data;
    }else{
        throw new Error(response.message || 'Error al eliminar nota de entrega');
    }
};

export async function updateDeliveryNote(deliveryNoteId, deliveryNoteData){
    const response = await apiRequest(`deliverynote/${deliveryNoteId}`, 'PUT', deliveryNoteData);
    if(response.success){
        return response.data;
    }else{
        throw new Error(response.message || 'Error al actualizar nota de entrega');
    }
};