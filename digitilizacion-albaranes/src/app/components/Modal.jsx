import {useRouter} from 'next/navigation';

export default function Modal({ title, children, onClose, isOpen, object }) {
    if (!isOpen) return null;
    const router = useRouter();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-11/12 sm:w-2/3 lg:w-1/3 animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
                <div className="mb-6 text-black">
                    {children}
                </div>
 
                <div className="flex justify-between">
                    <button className='blue-button'
                            onClick={()=>router.push(`/pages/dashboard/projects/${object._id}`)}>
                        Edit</button>
                    <button
                        className="blue-button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}