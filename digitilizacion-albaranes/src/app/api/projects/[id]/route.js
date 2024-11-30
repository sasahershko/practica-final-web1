import { apiRequest } from '@/app/lib/api';

export async function GET(request, { params }) {
    const { id } = params;
    const result = await apiRequest(`project/${id}`, 'GET');
    return new Response(JSON.stringify(result), { status: result.status });
}

export async function PUT(request, { params }) {
    const { id } = params;
    const formData = await request.json();
    const result = await apiRequest(`project/${id}`, 'PUT', formData);
    return new Response(JSON.stringify(result), { status: result.status });
}

export async function DELETE(request, { params }) {
    const { id } = params;
    const result = await apiRequest(`project/${id}`, 'DELETE');
    return new Response(JSON.stringify(result), { status: result.status });
}