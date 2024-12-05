'use client';
import { useState } from 'react';
import NavBarDashboard from './NavBarDashboard';
import SideBar from './SideBar';

export default function LayoutWithSidebar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">

        <NavBarDashboard />

        <button
          className="fixed top-4 left-4 z-50 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600 transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>


        {/* Main Content */}
        <main
          className={`flex-1 top-16 transition-all duration-300 bg-gray-50 ${isSidebarOpen ? 'ml-48' : 'ml-0'
            }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
