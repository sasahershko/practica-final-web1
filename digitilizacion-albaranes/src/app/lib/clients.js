'use server';
import { apiRequest } from './api.js';

export async function getClients() {
    const response = await apiRequest('client', 'GET');
    if (response.success) {
        return response.data;
    } else {
        console.log('ERROR DESDE CLIENTS.JS');
        throw new Error(response.message || 'Error al obtener clientes');
    }
}
export async function addClient(clientData) {
    const response = await apiRequest('client', 'POST', clientData);
    if (response.success) {
        return response.data;
    } else {
        throw new Error(response.message || 'Error al crear cliente');
    }
}

export async function deleteClient(clientId) {
    const response = await apiRequest(`client/${clientId}`, 'DELETE');
    if (response.success) {
        return response.data;
    } else {
        throw new Error(response.message || 'Error al eliminar cliente');
    }
}

export async function updateClient(clientId, clientData) {
    const response = await apiRequest(`client/${clientId}`, 'PUT', clientData);
    if (response.success) {
        return response.data;
    } else {
        throw new Error(response.message || 'Error al actualizar cliente');
    }
}

export async function getClientById(clientId) {
    const response = await apiRequest(`client/${clientId}`, 'GET');
    if (response.success) {
        return response.data;
    } else {
        throw new Error(response.message || 'Error al obtener cliente');
    }    
}