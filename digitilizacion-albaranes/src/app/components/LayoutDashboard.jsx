'use client';
import { useState } from 'react';
import NavBarDashboard from './NavBarDashboard';
import SideBar from './SideBar';

export default function LayoutWithSidebar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado del sidebar

  return (
    <>
      <NavBarDashboard />
      <div className="flex h-screen overflow-hidden">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <button className='nav-button fixed top-6 left-4' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  {isSidebarOpen ? <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" fill="#080341"></path> </g></svg>
                  : <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15 8.25V9L13.5 9V6H15V6.75L19.5 6.75V8.25L15 8.25ZM9 13.5L9 10.5L7.5 10.5L7.5 11.25L4.5 11.25V12.75L7.5 12.75L7.5 13.5H9ZM17.25 15V15.75H19.5V17.25H17.25V18H15.75V15H17.25ZM4.5 15.75V17.25H15V15.75H4.5ZM9.75 11.25L19.5 11.25V12.75L9.75 12.75V11.25ZM4.5 6.75H12.75V8.25H4.5V6.75Z" fill="#080341"></path> </g></svg>}  
        </button>


        {/* Main Content */}
        <div
          className={`flex-1 bg-gray-50 transition-all duration-300 ${
            isSidebarOpen ? 'ml-48' : 'ml-0'
          }`}
        >


          {/* Page Content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </>

  );
}
