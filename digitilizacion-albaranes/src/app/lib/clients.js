export const getClients = async () => {
    const response = await fetch('/api/clients');
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    return data.data;
};

export const getClientById = async (id) => {
    const response = await fetch(`/api/clients/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    return data.data;
};

export const addClient = async (clientData) => {
    const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    return data.data;
};

export const deleteClientById = async (id) => {
    const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    return data.data;
};
