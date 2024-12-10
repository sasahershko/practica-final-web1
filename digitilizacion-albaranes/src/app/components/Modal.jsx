import { useRouter } from 'next/navigation';

export default function Modal({ title, children, onClose, isOpen, actions }) {
    if (!isOpen) return null;
    const router = useRouter();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-hidden">
            <div className="bg-white rounded-lg p-8 w-11/12 sm:w-2/3 lg:w-1/3 animate-fade-in-up">
                <h2 className="text-[50px] font-bold mb-4 text-black">{title}</h2>
                <div className="mb-6 text-black">{children}</div>
                <div className="flex justify-end space-x-4">
                    {actions &&
                        actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (action.redirectPath) router.push(action.redirectPath);
                                    if (action.onClick) action.onClick();
                                    if (action.closeOnClick) onClose();
                                }}
                                className={`${action.style} px-6 py-3 rounded-lg shadow`}
                            >
                                {action.label}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
}
