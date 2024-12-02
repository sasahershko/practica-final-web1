export default function Card({ title, children, action }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 relative">
            <div className="flex justify-center items-center mb-4 relative">
                <h2 className="text-lg text-gray-900 font-bold">{title}</h2>
                {action && (
                    <div className="absolute right-0">
                        {action}
                    </div>
                )}
            </div>
            {children}
        </div>
    );
}
