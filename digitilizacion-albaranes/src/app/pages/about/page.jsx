'use client'
import {useRouter} from 'next/navigation'

export default function AboutPage(){
    const router = useRouter();

    return(
        <div>
            <section>
                <h1>About</h1>
                <p>Lorem ipsum dolor sit amet, ...</p>
                <button className='bg-sky-200 px-3 py-2 rounded-md'
                onoClick={() => {
                    alert('Ejecutando...') 
                    router.push('/pages/login')}}>
                    Click
                    </button>
            </section>
        </div>
    )
}