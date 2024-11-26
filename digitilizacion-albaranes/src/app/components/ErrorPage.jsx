import { useState } from 'react';

export default function ErrorPage({ handleError }) {
    const [fading, setFading] = useState(false);

    const handleClick = () => {
        setFading(true); 
        setTimeout(() => {
            //cambio el estado después de la anmación
            handleError(); 
        }, 300); 
    };

    return (
        <div
            className={`flex flex-col items-center mt-[170px] min-h-screen transition-all duration-300 ease-in-out ${
                fading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
        >
            <button
                onClick={handleClick}
                className="mb-16 group focus:outline-none hover: p-2 transition-transform duration-300 ease-in-out hover:scale-110"
                aria-label="Reintentar"
            >
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1 h-24 bg-red-500 rounded-full transform rotate-45"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1 h-24 bg-red-500 rounded-full transform -rotate-45"></div>
                    </div>
                </div>
            </button>

            <div className="text-4xl font-bold text-red-500 mb-4">Error</div>
            <div className="text-xl text-gray-700 mb-4">We are sorry, something went wrong.</div>
            <div className="text-xl text-gray-700">Please try again clicking the <span className='text-red-600'>X</span> button.</div>
        </div>
    );
}
