// import { useFormik } from 'formik';
// import * as Yup from 'yup';

export default function Login(){

    const handleOnClick = () =>{
        alert('Ejecutando...');
    }

    return(
        <div>
            <h1 className="text-center text-[100px] mt-36 max-h-screen">LOGIN</h1>
            <form className='flex mx-auto flex-col max-w-[300px]'>
                <input
                    type='mail'
                    name='mail'
                    placeholder='E-mail'
                    className='mt-3 rounded-md px-3 py-2 text-black'
                />
                <input
                    type='text'
                    name='password'
                    placeholder='Password'
                    className='mt-3 rounded-md px-3 py-2'
                />
                <button onClick={()=>handleOnClick} className='bg-white text-black rounded-md mt-5 hover:bg-black hover:text-white transitiono  duration-300 ease-in-out py-3'>Send</button>
            </form>
        </div>
    )
}