'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import FilterBar from '@/app/components/FilterBar';

export default function DeliveryNoteList({ deliveryNotes }) {
  const [filters, setFilters] = useState({
    date: null,
    status: '',
    sort: ''
  });
  const [filteredNotes, setFilteredNotes] = useState(deliveryNotes);
  const router = useRouter();


  const handleDateChange = (date) => {
    setFilters(prev => ({ ...prev, date }));
  };

  const handleStatusChange = (status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleSortChange = (sort) => {
    setFilters(prev => ({ ...prev, sort }));
  };

  const applyFilters = () => {
    const { date, status, sort } = filters;

    let filtered = [...deliveryNotes];

    if (date) {
      filtered = filtered.filter(note =>
        moment(note.updatedAt).isSame(moment(date), 'day')
      );
    }

    if (status) {
      filtered = filtered.filter(note => note.status === status);
    }


    if (sort) {
      filtered.sort((a, b) => {
        if (sort === 'asc') {
          return a.description.localeCompare(b.description);
        } else if (sort === 'desc') {
          return b.description.localeCompare(a.description);
        }
        return 0;
      });
    }

    setFilteredNotes(filtered);
  };

  return (
    <>
      <FilterBar
        onDateChange={handleDateChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onFilterApply={applyFilters}
      />

      <div className="p-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="p-3 text-left border border-gray-300">Description</th>
              <th className="p-3 text-left border border-gray-300">Code</th>
              <th className="p-3 text-left border border-gray-300">Date</th>
              <th className="p-3 text-left border border-gray-300">Client</th>
              <th className="p-3 text-left border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (

                <tr
                  key={index}
                  className="odd:bg-white transition duration-300 even:bg-gray-50 hover:bg-gray-100 text-black"
                  onClick={() => router.push(`/pages/dashboard/deliveryNotes/${note._id}`)}
                >
                  <td className="p-3 border border-gray-300">{note.description}</td>
                  <td className="p-3 border border-gray-300">{note._id}</td>

                  {/* pongo updatedAt porque no está la variable de workdate  */}
                  <td className="p-3 border border-gray-300">
                    {note.updatedAt ? moment(note.updatedAt).format('DD/MM/YYYY') : ''}
                  </td>
                  <td className="p-3 border border-gray-300 flex items-center space-x-2">
                    <img
                      src={note.clientImage || 'https://via.placeholder.com/40'}
                      alt="Client"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{note.clientName}</span>
                  </td>
                  <td
                    // ${note?.status === 'CANCELED' ? 'text-red-500' : note?.status === 'PENDING' ? 'text-yellow-500' : 'text-green-500'
                    className={`p-3 border border-gray-300  text-yellow-500}`}
                  >
                    PENDING
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No delivery notes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
