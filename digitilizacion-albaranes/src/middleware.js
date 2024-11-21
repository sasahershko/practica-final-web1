import {NextResponse} from 'next/server';


export function middleware(request) {

    const currentUser = request.cookies.get('bytoken')?.value;
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

    const protectedRoutes = ['/sideBar/dashboard', '/sideBar/summary', '/sideBar/transactions', '/sideBar/notifications', '/sideBar/settings'];

    //redirigir al dashboard si el usuario está autenticado
    if (currentUser && isLoggedIn &&(request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup'))) {
        console.log('Usuario autenticado, redirigiendo a /sideBar/summary');
        return NextResponse.redirect(new URL('/sideBar/summary', request.url));
    }

    //redirigir al login si el usuario no está autenticado
    if((!isLoggedIn || !currentUser) && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))){
        return NextResponse.redirect(new URL('/pages/login', request.url));
    }

    // return NextResponse.redirect(new URL('/', request.url));
}
    
export const config = {
    matcher: ['/pages/:path*', '/sideBar/:path*'],
};