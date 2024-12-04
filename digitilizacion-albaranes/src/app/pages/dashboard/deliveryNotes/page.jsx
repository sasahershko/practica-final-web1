'use client';

import { useEffect, useState } from 'react';
import { getDeliveryNotes } from '@/app/lib/deliveryNotes';
import FilterBar from '@/app/components/FilterBar';
import DeliveryNoteList from './components/DeliveryNoteList';

export default function DeliveryNotesPage() {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      try {
        const notes = await getDeliveryNotes();
        setDeliveryNotes(notes);
      } catch (error) {
        console.error('Error al obtener delivery notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='animate-fade-in-up'>
      <h1 className='big-title'>Delivery Notes</h1>
      <DeliveryNoteList deliveryNotes={deliveryNotes} />
    </div>
  );
}
