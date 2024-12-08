'use client';
import { useState } from 'react';
import { getPDFDeliveryNote } from '@/app/lib/deliveryNotes';

export default function DownloadPDFDeliveryNote({ deliveryNoteId }) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);
        setError(null);

        try {
            //llama a la función para obtener el PDF
            const blob = await getPDFDeliveryNote(deliveryNoteId);

            //crear una URL para el blob
            const fileURL = window.URL.createObjectURL(blob);

            //crear un enlace temporal para descargar el archivo
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = `delivery_note_${deliveryNoteId}.pdf`;
            link.click();

            // Liberar la URL creada para el blob
            window.URL.revokeObjectURL(fileURL);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={handleDownload}
                disabled={isLoading}
                className={`px-4 py-2 bg-blue-500 text-white rounded ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {isLoading ? 'Downloading...' : 'Download PDF'}
            </button>
        </div>
    );
}
