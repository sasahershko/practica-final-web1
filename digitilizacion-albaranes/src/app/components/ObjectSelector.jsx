'use client';
import { useState } from 'react';

export default function ObjectSelector({ objects = [], onSelect,
    displayKey, //propiedad del objeto para mostrar como texto en el selector 
    renderDetails,
    placeholder = 'Select an object' }) {

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSelectObject = (object) => {
        setSelected(object);
        onSelect(object);
        setIsOpen(false); //cierro menú desplegable
    }

    //filtrado de objetos
    const filteredObjects = objects.filter((ob) => {
        return ob[displayKey]?.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='w-full px-4 py-2 rounded-lg bg-white shadow focus:outline-none  text-black'>
                {selected ? selected[displayKey] : placeholder}
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg text-black">
                    {/*campo de búsqueda */}
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Buscar"
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 border rounded focus:outline-none"
                        />
                    </div>

                    {/*lista de objetos */}
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredObjects.map(obj => (
                            <li
                                key={obj.id || obj[displayKey]} //usar id o displayKey como clave única
                                onClick={() => handleSelectObject(obj)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 "
                            >
                                {/*renderizado para los detalles */}
                                {renderDetails ? renderDetails(obj) : <p>{obj[displayKey]}</p>}
                            </li>
                        ))}
                        {filteredObjects.length === 0 && (
                            <li className="px-4 py-2 text-center text-gray-500">No objects found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}