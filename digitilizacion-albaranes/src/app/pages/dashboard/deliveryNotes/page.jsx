'use client';

import { useEffect, useState } from 'react';
import { getDeliveryNotes } from '@/app/lib/deliveryNotes';
import FilterBar from '@/app/components/FilterBar';

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

  const handleFilterClick = () => {
    console.log('Filter button clicked');
  };

  const handleDateChange = (date) => {
    console.log('Selected date:', date);
  };


  return (
    <div>
      <h1 className='big-title'>Delivery Notes</h1>
      <FilterBar onFilterClick={handleFilterClick} onDateChange={handleDateChange} />
      {loading ? (
        <p>Loading...</p>
      ) : deliveryNotes.length > 0 ? (
        <ul>
          {deliveryNotes.map(note => (
            <li key={note.id}>
              {note.code} - {note.clientName} - {note.status}
            </li>
          ))}
        </ul>
      ) : <p>No delivery notes found</p>}
    </div>
  );
}
