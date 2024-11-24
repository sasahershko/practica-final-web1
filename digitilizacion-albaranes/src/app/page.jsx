'use client'
// ELIMINAR framer-motion!!
import NavBar from './components/NavBar';

export default function HomePage(){

    // sm: Pantallas pequeñas (≥ 640px)
    // md: Pantallas medianas (≥ 768px)
    // lg: Pantallas grandes (≥ 1024px)
    // xl: Pantallas extra grandes (≥ 1280px)
    // 2xl: Pantallas muy grandes (≥ 1536px)

    return (
       <>
            <NavBar/>
            <div className  ='flex flex-col items-center justify-center bg-white text-black mt-[260px]'>

            <h1 className='animate-fade-in-up text-7xl font-bold w-full text-center'>Welcome to</h1>

            <h2 className='text-9xl font-semibold mt-4 animate-fade-in-down w-full text-center'>
                {/* bg-clip es para que se añada solo al texto y no al fondo */}
                <span className='bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient-move'>
                    Digitization of delivery notes
                </span>
            </h2>
            </div>
       </>

      );
}
