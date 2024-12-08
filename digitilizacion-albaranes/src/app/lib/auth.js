// import {cookies} from 'next/headers';

// async function getUser(creds){
//     try{
//         const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user`;
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cookie': cookies
//             }
//         });

//         return response.json();
//     }catch(e){
//         console.log(e.message);
//     }
// }
import {apiRequest} from './api';

export async function login(email, password) {
    const response = await apiRequest('user/login', 'POST', { email, password });
    if (response.success) {
        const cookieStore = await cookies();
        cookieStore.set('bytoken', response.data.token, { path: '/', httpOnly: false });
        cookieStore.set('isLoggedIn', 'true', { path: '/', httpOnly: false });
    }
    return response;
}

export async function register(email, password) {
    const response = await apiRequest('user/register', 'POST', { email, password });
    if (response.success) {
        const cookieStore = await cookies();
        cookieStore.set('bytoken', response.data.token, { path: '/', httpOnly: false });
    }
    return response;
}

export async function verify(codeValue) {
    return apiRequest('user/validation', 'PUT', { code: codeValue });
}

export async function logout() {
    cookies().delete('bytoken');
    cookies().delete('isLoggedIn');
    redirect('/pages/login');
}

export async function changePassword(newPassword) {
    return apiRequest('user/password', 'PATCH', { password: newPassword });
}