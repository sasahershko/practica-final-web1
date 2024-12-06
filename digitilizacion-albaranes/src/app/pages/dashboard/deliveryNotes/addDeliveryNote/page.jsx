'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { getClients } from '@/app/lib/clients';
// import { addProject } from '@/app/lib/projects';

import DeliveryForm from '@/app/pages/dashboard/deliveryNotes/components/DeliveryForm';
//fetchear clientes y proyectos para que pueda elegirlos

export default function AddDeliveryNote() {
    return (
        <div>
            <DeliveryForm title='Add Delivery Note' /> 
            <h1 className=''>Add Delivery Note</h1>
        </div>
    )
}