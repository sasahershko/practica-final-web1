export async function createClient(token, formData) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/client`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                'name': formData.name,
                'email': formData.email,
                'phone': formData.phone,
                'address': formData.address
            })
        });

        return response.json();
    } catch (e) {
        console.log(e.message);
    }
}