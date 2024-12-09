'use client';
import { useState } from 'react';

export default function FilterBar({ onFilterApply, onDateChange, onStatusChange, onSortChange }) {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const applyFilters = () => {
        onFilterApply(); 
        setShowFilters(false);
    };

    return (
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm text-black">
            <div className="text-lg font-semibold">Filters</div>

            <div className="flex items-center gap-4">
               
                <input
                    type="date"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    onChange={(e) => onDateChange(e.target.value)} 
                />

                {/* Ordenamiento por Descripción */}
                <select
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    onChange={(e) => onSortChange(e.target.value)} // Actualiza el orden de descripción
                >
                    <option value="">Sort by Description</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

                <select
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    onChange={(e) => onStatusChange(e.target.value)} // Actualiza el filtro de estado
                >
                    <option value="">Filter by Status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="DONE">DONE</option>
                    <option value="UNDONE">UNDONE</option>
                </select>

                <button
                    onClick={applyFilters}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}
