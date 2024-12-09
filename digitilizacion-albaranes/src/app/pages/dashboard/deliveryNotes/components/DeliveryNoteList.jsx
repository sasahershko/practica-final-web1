'use client';
import { Checkbox } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import FilterBar from '@/app/components/FilterBar';
import { getPDFDeliveryNote } from '@/app/lib/deliveryNotes';
import { getClientById } from '@/app/lib/clients';
import Loading from '@/app/components/Loading';

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
  const [loading, setLoading] = useState(true);

  //ESTO ES PARA TEMA DE CLIENTES YA QUE NO NOS LO PROPORCIONA EL BACKEND, hay que sacar datos del cliente desde su id
  useEffect(() => {

    const fetchClientNames = async () => {
      const updatedNotes = await Promise.all(
        deliveryNotes.map(async (note) => {
          if (note.clientId) {
            try {
              const client = await getClientById(note.clientId);
              return { ...note, clientName: client.name };
            } catch (error) {
              return { ...note, clientName: 'Error fetching client' };
            }
          }
          return { ...note, clientName: 'No client' };
        })
      );
      setFilteredNotes(updatedNotes);
      setLoading(false);
    };

    fetchClientNames();
  }, [deliveryNotes]);




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

  if (loading) {
    return <Loading />;
  }

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
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredNotes.length > 0 &&
                      selectedNotes.length === filteredNotes.length
                    }
                    onChange={(e) =>
                      setSelectedNotes(
                        e.target.checked ? filteredNotes.map((note) => note._id) : []
                      )
                    }
                    className="w-6 h-6 appearance-none rounded-lg bg-gray-200 border-2 border-gray-300 checked:bg-blue-500 checked:border-blue-500 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-300 cursor-pointer hover:scale-105 active:scale-90"
                  />
                </div>
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
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      checked={selectedNotes.includes(note._id)}
                      onChange={() => toggleSelectNote(note._id)}
                      className="w-6 h-6 appearance-none rounded-lg bg-gray-200 border-2 border-gray-300 checked:bg-blue-500 checked:border-blue-500 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-300 cursor-pointer hover:scale-105 active:scale-90"
                    />
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300">{note.description}</td>
                  <td className="p-3 border border-gray-300">{note._id}</td>

                  {/* pongo updatedAt porque no está la variable de workdate */}
                  <td className="p-3 border border-gray-300">
                    {note.updatedAt ? moment(note.updatedAt).format('DD/MM/YYYY') : ''}
                  </td>

                  <td className="p-3 border border-gray-300">
                    {note.clientName ? note.clientName : 'No client'}
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
