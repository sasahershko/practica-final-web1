import { getDeliveryNoteById, updateDeliveryNote, deleteDeliveryNote } from '@/app/lib/deliveryNotes';

export async function GET(request, { params }) {
    const { id } = params;
    try {
        const result = await getDeliveryNoteById(id);
        return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
    } catch (error) {
        console.error(error.message);
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    try {
        const body = await request.json();
        const result = await updateDeliveryNote(id, body);
        return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
    } catch (error) {
        console.error(error.message);
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        const result = await deleteDeliveryNote(id);
        return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
    } catch (error) {
        console.error(error.message);
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}
