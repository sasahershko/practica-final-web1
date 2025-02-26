'use client'
import {useState} from 'react';
import {Button, toggle} from '@nextui-org/react';
import Link from 'next/link';

// SVGs SACADOS DE: https://www.svgrepo.com/collection/iconship-interface-icons
// ARCHIVOS: <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15 8.25V9L13.5 9V6H15V6.75L19.5 6.75V8.25L15 8.25ZM9 13.5L9 10.5L7.5 10.5L7.5 11.25L4.5 11.25V12.75L7.5 12.75L7.5 13.5H9ZM17.25 15V15.75H19.5V17.25H17.25V18H15.75V15H17.25ZM4.5 15.75V17.25H15V15.75H4.5ZM9.75 11.25L19.5 11.25V12.75L9.75 12.75V11.25ZM4.5 6.75H12.75V8.25H4.5V6.75Z" fill="#080341"></path> </g></svg>
// FLECHA DERECHA: <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17.6492 11.2501L12.7904 6.53852L13.8346 5.46167L20.5774 12.0001L13.8346 18.5385L12.7904 17.4617L17.6492 12.7501H3V11.2501H17.6492Z" fill="#080341"></path> </g></svg>

export default function SideBar({isOpen, setIsOpen}){
    const toggleSidebar = () =>{
        setIsOpen(!isOpen);
    };

    return(
        <div className='flex h-screen z-70'>
            <div className={`fixed top-16 h-full shadow-md transition-transform duration-300 ${isOpen ? 'translate-x-0': '-translate-x-full'}`}>
                <nav className='px-5 py-8'>
                    <ul className='space-y-4 text-left'>
                        <li>
                            <div className='py-3 px-4 rounded-xl hover:bg-indigo-50 transition-colors'>
                                <Link href='/pages/dashboard/summary' className='flex items-center gap-3'>
                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M7.5 4.5C6.67157 4.5 6 5.17157 6 6V15.4013C6.44126 15.1461 6.95357 15 7.5 15H18V4.5H7.5ZM18 16.5H7.5C6.67157 16.5 6 17.1716 6 18C6 18.8284 6.67157 19.5 7.5 19.5H18V16.5ZM4.5 18L4.5 6C4.5 4.34315 5.84315 3 7.5 3H18.75L19.5 3.75V21H7.5C5.84315 21 4.5 19.6569 4.5 18Z" fill="#080341"></path> </g></svg>
                                        <span className='text-blue-900 text-[18px]'>Summary</span>
                                </Link>
                            </div>

                            <div className='flex items-center py-3 px-4 rounded-xl hover:bg-indigo-50 transition-colors'>
                                <Link href='/pages/dashboard/clients' className='flex items-center gap-3'>
                                    <svg width="25px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M3 18C3 15.3945 4.66081 13.1768 6.98156 12.348C7.61232 12.1227 8.29183 12 9 12C9.70817 12 10.3877 12.1227 11.0184 12.348C11.3611 12.4703 11.6893 12.623 12 12.8027C12.3107 12.623 12.6389 12.4703 12.9816 12.348C13.6123 12.1227 14.2918 12 15 12C15.7082 12 16.3877 12.1227 17.0184 12.348C19.3392 13.1768 21 15.3945 21 18V21H15.75V19.5H19.5V18C19.5 15.5147 17.4853 13.5 15 13.5C14.4029 13.5 13.833 13.6163 13.3116 13.8275C14.3568 14.9073 15 16.3785 15 18V21H3V18ZM9 11.25C8.31104 11.25 7.66548 11.0642 7.11068 10.74C5.9977 10.0896 5.25 8.88211 5.25 7.5C5.25 5.42893 6.92893 3.75 9 3.75C10.2267 3.75 11.3158 4.33901 12 5.24963C12.6842 4.33901 13.7733 3.75 15 3.75C17.0711 3.75 18.75 5.42893 18.75 7.5C18.75 8.88211 18.0023 10.0896 16.8893 10.74C16.3345 11.0642 15.689 11.25 15 11.25C14.311 11.25 13.6655 11.0642 13.1107 10.74C12.6776 10.4869 12.2999 10.1495 12 9.75036C11.7001 10.1496 11.3224 10.4869 10.8893 10.74C10.3345 11.0642 9.68896 11.25 9 11.25ZM13.5 18V19.5H4.5V18C4.5 15.5147 6.51472 13.5 9 13.5C11.4853 13.5 13.5 15.5147 13.5 18ZM11.25 7.5C11.25 8.74264 10.2426 9.75 9 9.75C7.75736 9.75 6.75 8.74264 6.75 7.5C6.75 6.25736 7.75736 5.25 9 5.25C10.2426 5.25 11.25 6.25736 11.25 7.5ZM15 5.25C13.7574 5.25 12.75 6.25736 12.75 7.5C12.75 8.74264 13.7574 9.75 15 9.75C16.2426 9.75 17.25 8.74264 17.25 7.5C17.25 6.25736 16.2426 5.25 15 5.25Z" fill="#080341"></path> </g></svg>
                                    <span className='text-blue-900 text-[18px]'>Clients</span>
                                </Link>
                            </div>

                            <div className='flex items-center py-3 px-4 rounded-xl hover:bg-indigo-50 transition-colors'>
                                <Link href='/pages/dashboard/projects' className='flex items-center gap-3'>
                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.5 6L5.25 5.25H18.75L19.5 6V9H20.25L21 9.75V18L20.25 18.75H15.6818H14.25H7.5H3.75L3 18V12L3.75 11.25H4.5V6ZM6 11.25H7.5L8.25 12L8.25 17.25H13.5V9.75L14.25 9L18 9V6.75H6V11.25ZM19.5 17.25H15.6818H15L15 10.5H18H19.5V17.25ZM4.5 12.75H6.75L6.75 17.25H4.5L4.5 12.75Z" fill="#080341"></path> </g></svg>
                                    <span className='text-blue-900 text-[18px]'>Projects</span>
                                </Link>
                            </div>

                            <div className='flex items-center py-3 px-4 rounded-xl hover:bg-indigo-50 transition-colors'>
                                <Link href='/pages/dashboard/deliveryNotes' className='flex items-center gap-3'>
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 3.66333L20.25 7.7398V17.01L12 21.0865L3.75 17.01V7.7398L12 3.66333ZM5.25 9.41292V16.078L11.25 19.0427V12.3776L5.25 9.41292ZM12.75 12.3776V19.0427L18.75 16.078V9.41292L16.5 10.5247V13.4999L15 14.2499V11.2659L12.75 12.3776ZM17.807 8.20577L15.8527 9.17139C15.8099 9.13606 15.7624 9.10498 15.7106 9.07908L10.1015 6.27454L12 5.33645L17.807 8.20577ZM8.41452 7.1081L14.1871 9.9944L12 11.0751L6.19304 8.20577L8.41452 7.1081Z" fill="#080341"></path> </g></svg>
                                    <span className='text-blue-900 text-[18px]'>Delivery</span>
                                </Link>
                            </div>
                            
                            <div className='flex items-center py-3 px-4 rounded-xl hover:bg-indigo-50 transition-colors'>
                                <Link href='/pages/dashboard/settings' className='flex items-center gap-3'>
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.65 3L9.93163 3.53449L9.32754 5.54812L7.47651 4.55141L6.5906 4.68143L4.68141 6.59062L4.55139 7.47652L5.5481 9.32755L3.53449 9.93163L3 10.65V13.35L3.53449 14.0684L5.54811 14.6725L4.55142 16.5235L4.68144 17.4094L6.59063 19.3186L7.47653 19.4486L9.32754 18.4519L9.93163 20.4655L10.65 21H13.35L14.0684 20.4655L14.6725 18.4519L16.5235 19.4486L17.4094 19.3185L19.3186 17.4094L19.4486 16.5235L18.4519 14.6724L20.4655 14.0684L21 13.35V10.65L20.4655 9.93163L18.4519 9.32754L19.4486 7.47654L19.3186 6.59063L17.4094 4.68144L16.5235 4.55142L14.6725 5.54812L14.0684 3.53449L13.35 3H10.65ZM10.4692 6.96284L11.208 4.5H12.792L13.5308 6.96284L13.8753 7.0946C13.9654 7.12908 14.0543 7.16597 14.142 7.2052L14.4789 7.35598L16.7433 6.13668L17.8633 7.25671L16.644 9.52111L16.7948 9.85803C16.834 9.9457 16.8709 10.0346 16.9054 10.1247L17.0372 10.4692L19.5 11.208V12.792L17.0372 13.5308L16.9054 13.8753C16.8709 13.9654 16.834 14.0543 16.7948 14.1419L16.644 14.4789L17.8633 16.7433L16.7433 17.8633L14.4789 16.644L14.142 16.7948C14.0543 16.834 13.9654 16.8709 13.8753 16.9054L13.5308 17.0372L12.792 19.5H11.208L10.4692 17.0372L10.1247 16.9054C10.0346 16.8709 9.94569 16.834 9.85803 16.7948L9.52111 16.644L7.25671 17.8633L6.13668 16.7433L7.35597 14.4789L7.2052 14.142C7.16597 14.0543 7.12908 13.9654 7.0946 13.8753L6.96284 13.5308L4.5 12.792L4.5 11.208L6.96284 10.4692L7.0946 10.1247C7.12907 10.0346 7.16596 9.94571 7.20519 9.85805L7.35596 9.52113L6.13666 7.2567L7.25668 6.13667L9.5211 7.35598L9.85803 7.2052C9.9457 7.16597 10.0346 7.12908 10.1247 7.0946L10.4692 6.96284ZM14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12ZM15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12Z" fill="#080341"></path> </g></svg>
                                    <span className='text-blue-900 text-[18px]'>Settings</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}