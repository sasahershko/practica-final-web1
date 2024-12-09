'use client';
import {useState, useRef, useEffect} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ onSearch, placeholder = 'Search...' }) {
  const [search, setSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const results = await onSearch(value);
    setSearchResults(results);
    setIsDropdownOpen(true);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", closeDropdown);
    } else {
      document.removeEventListener("mousedown", closeDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative w-full max-w-lg text-black" ref={dropdownRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleInputChange}
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-gray-100 transition-all duration-200 focus:bg-white"
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

      <AnimatePresence>
        {isDropdownOpen && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute bg-white w-full max-w-lg mt-2 rounded-lg shadow-lg z-50"
          >
            <ul>
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  onClick={() => {
                    const path = placeholder.includes('client')
                      ? 'clients'
                      : placeholder.includes('projects')
                      ? 'projects'
                      : 'deliveryNotes';
                    router.push(`/pages/dashboard/${path}/${result._id}`);
                  }}
                >
                  {result.name || result.description || 'Sin descripción'}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

