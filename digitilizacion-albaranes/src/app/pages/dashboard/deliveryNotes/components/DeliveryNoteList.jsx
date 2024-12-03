'use client';

import React from 'react';

export default function DeliveryNoteList({ deliveryNotes }) {
  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="p-3 text-left border border-gray-300">Code</th>
            <th className="p-3 text-left border border-gray-300">Date</th>
            <th className="p-3 text-left border border-gray-300">Description</th>
            <th className="p-3 text-left border border-gray-300">Client</th>
            <th className="p-3 text-left border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveryNotes.length > 0 ? (
            deliveryNotes.map((note, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-black"
              >
                <td className="p-3 border border-gray-300">{note._id}</td>
                <td className="p-3 border border-gray-300">
                  {note.begin}
                </td>
                <td className="p-3 border border-gray-300">{note.description}</td>
                <td className="p-3 border border-gray-300 flex items-center space-x-2">
                  <img
                    src={note.clientImage || 'https://via.placeholder.com/40'}
                    alt="Client"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{note.clientName}</span>
                </td>
                <td
                  className={`p-3 border border-gray-300 ${
                    note.status === 'CANCELED'
                      ? 'text-red-500'
                      : note.status === 'PENDING'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  {note.status}
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
  );
}
