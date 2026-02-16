const API_BASE_URL = 'http://localhost:8080/api/v1'; // Adjust if needed

export async function getUser(token) {
    if (!token) return null;

    try {
        // Decode token to get user ID (simplified, ideally use a proper JWT library or dedicated endpoint)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id; // Adjust based on your token payload structure

        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export async function updateUser(userId, data, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Failed to update user');
        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export function getAuthToken() {
    // Check URL parameters first (e.g., after login redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
        // Save to localStorage and clear URL
        localStorage.setItem('auth_token', tokenFromUrl);
        window.history.replaceState({}, document.title, window.location.pathname);
        return tokenFromUrl;
    }

    return localStorage.getItem('auth_token');
}

export function logout() {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
}
