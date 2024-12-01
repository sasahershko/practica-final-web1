'use server';
import { apiRequest } from './api';

export async function getProjects() {
    try{
        const response = await apiRequest('project', 'GET');
        if (response.success) {
            return response.data; 
        } else {
            throw new Error(response.message || 'Error al obtener proyectos');
        }
    }catch(error){
        throw new Error('Error al obtener proyectos');
    }
}

export async function getProjectById(projectId) {
    try{
        const response = await apiRequest(`project/one/${projectId}`, 'GET');
        if (response.success) {
            return response.data; 
        } else {
            throw new Error(response.message || 'Error al obtener el proyecto');
        }

    }catch(error){
        throw new Error('Error al obtener el proyecto');
    }

}

export async function addProject(projectData) {

    try{
        const response = await apiRequest('project', 'POST', projectData);
        if (response.success) {
            return response.data; 
        } else {
            throw new Error(response.message || 'Error al añadir el proyecto');
        }
    }catch(error){
        throw new Error('Error al añadir el proyecto');
    }

}


export async function updateProject(projectId, projectData) {

    try{
        const response = await apiRequest(`project/${projectId}`, 'PUT', projectData);
        if (response.success) {
            return response.data; 
        } else {
            throw new Error(response.message || 'Error al actualizar el proyecto');
        }
    }catch(error){
        throw new Error('Error al actualizar el proyecto');
    }
}


export async function deleteProject(projectId) {

    try{
        const response = await apiRequest(`project/${projectId}`, 'DELETE');
        if (response.success) {
            return response.data; 
        } else {
            throw new Error(response.message || 'Error al eliminar el proyecto');
        }
    }catch(error){
        throw new Error('Error al eliminar el proyecto');
    }

}

export async function getProjectByClientId(clientId) {
    try{
        const response = await apiRequest(`project/${clientId}`, 'GET');
        if (response.success) {
            return response.data; 
        } else {
            throw new Error(response.message || 'Error al obtener el proyecto');
        }

    }catch(error){
        throw new Error('Error al obtener el proyecto');
    }

}
