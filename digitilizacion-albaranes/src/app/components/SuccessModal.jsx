'use client';

import { useRouter } from 'next/navigation';

export default function SuccessModal({ message = 'Success!', redirectPath = '/pages/dashboard/summary', buttonText = 'Go to Summary' }) {
    const router = useRouter();

    const handleRedirect = () => {
        router.push(redirectPath);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 animate-fade-in-up">
                <div className="text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-green-500 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-6.219-8.56"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
                    <p className="text-gray-600 mb-6">Your operation was completed successfully!</p>
                    <button
                        onClick={handleRedirect}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-400 transition duration-300"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
