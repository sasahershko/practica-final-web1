'use client';
import { Lumiflex } from "uvcanvas";
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();
  return (
    <div className="relative w-full h-screen">
      {/* FONDO */}
      <div className="absolute inset-0 z-0">
        <Lumiflex style={{ width: "100%", height: "100%" }} />
      </div>

      {/* TEXTO SUPERPUESTO */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-black text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl">Page Not Found</p>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-indigo-300 rounded-md text-black hover:bg-indigo-400 transition"
          onClick={()=> router.push('/')}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
