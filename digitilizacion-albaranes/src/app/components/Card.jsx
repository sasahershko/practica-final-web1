export default function Card({title, children}){
    return(
        <div className='bg-white rounded-lg shadow p-6 '>
            <h2 className='text-lg text-gray-900 mb-4 text-center font-bold'>{title}</h2>
            {children}
        </div>
    )
}