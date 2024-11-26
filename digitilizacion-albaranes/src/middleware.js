import {NextResponse} from 'next/server';


export function middleware(request) {

    const currentUser = request.cookies.get('bytoken')?.value;
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

    const protectedRoutes = ['/pages/dashboard/summary', '/pages/dashboard/projects', '/pages/dashboard/clients', '/pages/dashboard/suppliers', '/pages/dashboard/deliveryNotes', '/pages/dashboard/settings'];

    //redirigir al dashboard si el usuario está autenticado
    if (currentUser && isLoggedIn &&(request.nextUrl.pathname.startsWith('/pages/login') || request.nextUrl.pathname.startsWith('/pages/signup'))) {
        console.log('Usuario autenticado, redirigiendo a /dashboard/summary');
        return NextResponse.redirect(new URL('/dashboard/summary', request.url));
    }

    //redirigir al login si el usuario no está autenticado
    if((!isLoggedIn || !currentUser) && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))){
        return NextResponse.redirect(new URL('/pages/login', request.url));
    }

    // return NextResponse.redirect(new URL('/', request.url));
}
    
export const config = {
    matcher: ['/pages/:path*', '/dashboard/:path*'],
};