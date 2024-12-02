// import { getDeliveryNotesByProjectId, deleteDeliveryNote, updateDeliveryNote } from "@/app/lib/api";

// export async function getDeliveryNotesByProjectId(request, {params}) {
//     const {id} = params;
//     const result = await getDeliveryNotesByProjectId(id);
//     return new Response(JSON.stringify(result), {status: result.status});
// }

// export async function deleteDeliveryNote(request, {params}){
//     const {id} = params;
//     const result = await deleteDeliveryNote(id);
//     return new Response(JSON.stringify(result), {status: result.status});
// }

// export async function updateDeliveryNote(request, {params}){
//     const {id} = params;
//     const updateData = await request.json();
//     const result = await updateDeliveryNote(id, updateData);
//     return new Response(JSON.stringify(result), {status: result.status});
// }