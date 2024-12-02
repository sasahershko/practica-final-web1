import { getDeliveryNotes, addDeliveryNote } from '@/app/lib/deliveryNotes';

export async function GET(request) {
    try {
        const result = await getDeliveryNotes();
        return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
    } catch (error) {
        console.error(error.message);
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
};

export async function POST(request) {
    try {
        const body = await request.json();
        const result = await addDeliveryNote(body);
        return new Response(JSON.stringify({ success: true, data: result }), { status: 201 });
    } catch (error) {
        console.error(error.message);
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
};
