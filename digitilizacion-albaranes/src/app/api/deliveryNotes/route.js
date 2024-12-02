import {apiRequest} from '@/app/lib/api';

export async function GET(request) {
    const result = await apiRequest('deliveryNotes', 'GET');
    return new Response(JSON.stringify(result), { status: result.status });
}

export async function POST(request) {
    const formData = await request.json();
    const result = await apiRequest('deliveryNotes', 'POST', formData);
    return new Response(JSON.stringify(result), { status: result.status });
}
