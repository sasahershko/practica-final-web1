'use client'
import { useState } from 'react';

export default function FilterBar({ onFilterApply, onDateChange }) {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const applyFilters = () => {
        onFilterApply();
        setShowFilters(false);
    }

    return (
        <div className='flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm text-black'>
            <div className='text-lg font-semibold'>Filters</div>

            <div className='flex items-center gap-4'>
                <input
                    type='date'
                    className='px-4 py-2 border border-gray-300 rounded-lg'
                    onChange={(e) => onDateChange(e.target.value)}
                />

                <div className='relative'>
                    <button
                        onClick={toggleFilters}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h11M9 21l-6-6 6-6M21 3v18"
                            />
                        </svg>
                        Filters
                    </button>

                    {showFilters && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            <div className="p-4">
                                <h4 className="font-semibold text-lg mb-2">Apply Filters</h4>
                                <label className="block mb-2">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                    />
                                    Filter 1
                                </label>
                                <label className="block mb-2">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                    />
                                    Filter 2
                                </label>
                                <label className="block mb-2">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                    />
                                    Filter 3
                                </label>
                                <button
                                    onClick={applyFilters}
                                    className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};