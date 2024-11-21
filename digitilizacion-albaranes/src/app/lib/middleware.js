import {redirect} from 'next/navigation';

export function middleware(request) {
    const currentUser = request.cookies.get('token')?.value;

    if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard') &&
                !request.nextUrl.pathname.startsWith('/register')) {
        return Response.redirect(new URL('/dashboard', request.url))
    }

    if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/', request.url))
    }
    
}
    
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}