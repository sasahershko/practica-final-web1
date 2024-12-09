'use client';
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
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  //ESTADO DE FECHA
  const determineStatus = (updatedAt) => {
    const today = moment().startOf('day');
    const updatedDate = moment(updatedAt).startOf('day');

    if (!updatedAt) return 'UNDONE';
    if (updatedDate.isSame(today)) return 'PENDING';
    if (updatedDate.isBefore(today)) return 'DONE';
    return 'UNDONE';
  };

  useEffect(() => {
    const fetchClientNames = async () => {
      const updatedNotes = await Promise.all(
        deliveryNotes.map(async (note) => {
          const status = determineStatus(note.updatedAt);

          if (note.clientId) {
            try {
              const client = await getClientById(note.clientId);
              return { ...note, clientName: client.name, status };
            } catch (error) {
              return { ...note, clientName: 'Error fetching client', status };
            }
          }
          return { ...note, clientName: 'No client', status };
        })
      );
      setFilteredNotes(updatedNotes);
      setLoading(false);
    };

    fetchClientNames();
  }, [deliveryNotes]);

  const handleDateChange = (date) => {
    setFilters((prev) => ({ ...prev, date }));
  };

  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handleSortChange = (sort) => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  const applyFilters = async () => {
    setIsFiltering(true);

    const { date, status, sort } = filters;


    let filtered = await Promise.all(
      deliveryNotes.map(async (note) => {
        const noteStatus = determineStatus(note.updatedAt);

        let clientName = 'No client';
        if (note.clientId) {
          try {
            const client = await getClientById(note.clientId);
            clientName = client.name;
          } catch (error) {
            clientName = 'Error fetching client';
          }
        }

        return { ...note, status: noteStatus, clientName };
      })
    );


    if (date) {
      filtered = filtered.filter((note) =>
        moment(note.updatedAt).isSame(moment(date), 'day')
      );
    }


    if (status) {
      filtered = filtered.filter((note) => note.status === status);
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
    setIsFiltering(false);
  };



  const toggleSelectNote = (noteId) => {
    if (selectedNotes.includes(noteId)) {
      setSelectedNotes(selectedNotes.filter((id) => id !== noteId));
    } else {
      setSelectedNotes([...selectedNotes, noteId]);
    }
  };

  const handleDownloadSelected = async () => {
    try {
      setIsDownloading(true);

      await Promise.all(
        selectedNotes.map(async (noteId) => {
          const blob = await getPDFDeliveryNote(noteId);
          const fileURL = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = fileURL;
          link.download = `delivery-note-${noteId}.pdf`;
          document.body.appendChild(link);
          link.click();

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
        <button
          className={`mb-4 px-4 py-2 bg-blue-500 text-white rounded-md transition ${selectedNotes.length === 0 || isDownloading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={handleDownloadSelected}
          disabled={selectedNotes.length === 0 || isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download Selected'}
        </button>
        <div className="relative">
          {isFiltering ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
              <Loading /> {/* Indicador de carga solo para la tabla */}
            </div>
          ) : null}

          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="p-3 text-left border border-gray-300">
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
                        className="w-6 h-6 appearance-none rounded-lg bg-gray-200 border-2 border-gray-300 checked:bg-blue-500 checked:border-blue-500 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-300 cursor-pointer hover:scale-105 active:scale-90"
                      />
                    </td>
                    <td className="p-3 border border-gray-300">{note.description}</td>
                    <td className="p-3 border border-gray-300">{note._id}</td>
                    <td className="p-3 border border-gray-300">
                      {note.updatedAt ? moment(note.updatedAt).format('DD/MM/YYYY') : ''}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {note.clientName ? note.clientName : 'No client'}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {note.projectId?.name || 'No project'}
                    </td>
                    <td className={`p-3 border border-gray-300 text-${note.status === 'PENDING' ? 'yellow-500' : note.status === 'DONE' ? 'green-500' : 'red-500'}`}>
                      {note.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-3 text-center text-gray-500">
                    No delivery notes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
