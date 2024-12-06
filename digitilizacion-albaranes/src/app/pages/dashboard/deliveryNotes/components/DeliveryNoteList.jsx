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
  const [selectedNotes, setSelectedNotes] = useState([]); // Para almacenar los seleccionados
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

  const toggleSelectNote = (noteId) => {
    if (selectedNotes.includes(noteId)) {
      setSelectedNotes(selectedNotes.filter(id => id !== noteId));
    } else {
      setSelectedNotes([...selectedNotes, noteId]);
    }
  };

  const handleDownload = () => {
    try{
      selectedNotes.forEach(async (noteId) => {
        
      });
    }catch(error){

    }

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
        {/*botón de Descarga */}
        <button
          className={`mb-4 px-4 py-2 bg-blue-500 text-white rounded-md transition ${
            selectedNotes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleDownload}
          disabled={selectedNotes.length === 0}
        >
          Download Selected
        </button>

        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="p-3 text-left border border-gray-300">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedNotes(
                      e.target.checked ? filteredNotes.map(note => note._id) : []
                    )
                  }
                  checked={
                    filteredNotes.length > 0 &&
                    selectedNotes.length === filteredNotes.length
                  }
                />
              </th>
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
                  onClick={(e) => {
                    //evitar que el clic en el checkbox abra los detalles
                    if (e.target.type !== 'checkbox') {
                      router.push(`/pages/dashboard/deliveryNotes/${note._id}`);
                    }
                  }}
                >
                  <td className="p-3 border border-gray-300">
                    <input
                      type="checkbox"
                      checked={selectedNotes.includes(note._id)}
                      onChange={() => toggleSelectNote(note._id)}
                    />
                  </td>
                  <td className="p-3 border border-gray-300">{note.description}</td>
                  <td className="p-3 border border-gray-300">{note._id}</td>

                  {/*pongo updatedAt porque no está la variable de workdate */}
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
                  <td className={`p-3 border border-gray-300 text-yellow-500`}>
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
