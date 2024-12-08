'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import FilterBar from '@/app/components/FilterBar';
import { getPDFDeliveryNote } from '@/app/lib/deliveryNotes';

export default function DeliveryNoteList({ deliveryNotes }) {
  const [filters, setFilters] = useState({
    date: null,
    status: '',
    sort: ''
  });
  const [filteredNotes, setFilteredNotes] = useState(deliveryNotes);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
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

  const handleDownloadSelected = async () => {
    try {
      setIsDownloading(true);

      await Promise.all( //para descargar varios archivos a la vez
        selectedNotes.map(async (noteId) => {
          const blob = await getPDFDeliveryNote(noteId); //obtiene el blob del PDF
          const fileURL = window.URL.createObjectURL(blob); //crea url temporal para el blob


          const link = document.createElement('a'); //crea enlace
          link.href = fileURL; //establece el blob como destino del enlace
          link.download = `delivery-note-${noteId}.pdf`; //nombre único para cada archivo
          document.body.appendChild(link);
          link.click(); //simula el clic en el enlace para descargar el archivo

          //liberar recursos (memory) después de la descarga
          document.body.removeChild(link);
          window.URL.revokeObjectURL(fileURL);
        })
      );

    } catch (error) {
      console.error('Error during multi-download:', error.message);
    } finally {
      setIsDownloading(false);
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
        {/*bnotón de descarga múltiple */}
        <button
          className={`mb-4 px-4 py-2 bg-blue-500 text-white rounded-md transition ${selectedNotes.length === 0 || isDownloading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={handleDownloadSelected}
          disabled={selectedNotes.length === 0 || isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download Selected'}
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
              <th className="p-3 text-left border border-gray-300">Project</th>
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
                    // evitar que el clic en el checkbox abra los detalles
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

                  {/* pongo updatedAt porque no está la variable de workdate */}
                  <td className="p-3 border border-gray-300">
                    {note.updatedAt ? moment(note.updatedAt).format('DD/MM/YYYY') : ''}
                  </td>

                  <td className="p-3 border border-gray-300">
                    {note.clientId}
                  </td>

                  <td className="p-3 border border-gray-300">
                    {note.projectId.name ? note.projectId.name : 'No project'}
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
