import { apiRequest } from '@/app/lib/api';

export async function DELETE(request, { params }) {
    const { id } = params;
    const result = await apiRequest(`client/${id}`, 'DELETE');
    return new Response(JSON.stringify(result), { status: result.status });
}

export async function PUT(request, { params }) {
    const { id } = params;
    const formData = await request.json();
    const result = await apiRequest(`client/${id}`, 'PUT', formData);
    return new Response(JSON.stringify(result), { status: result.status });
}