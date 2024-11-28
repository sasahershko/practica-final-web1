'use client';
import {useState} from 'react';

export default function SearchBar({onSearch}){
  const [search, setSearch] = useState('');

  const handleSearch = (e) =>{
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  }

    return(
        <div className='relative w-full max-w-lg text-black'>
            <input
                type= 'text'
                placeholder= 'Search...'
                value={search}
                onChange={handleSearch}
                className='w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-blue-300 focus:border-transparent bg-gray-100 transition-all duration-200 focus:bg-white' 
            />

        <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
        </div>
    )
}