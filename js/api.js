const API_BASE_URL = 'https://lea.fly.dev/api/v1'; // Production backend

export async function getUser(token) {
    if (!token) return null;

    try {
        // Use /auth/me endpoint instead of decoding token
        const response = await fetch('https://lea.fly.dev/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('API Response:', response.status, response.statusText);
            throw new Error('Failed to fetch user');
        }

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

export async function validateToken(provider, token, authToken) {
    try {
        const response = await fetch(`${API_BASE_URL}/tokens/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ provider, token })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Validation failed');
        }

        return data; // { success: true, message: "..." }
    } catch (error) {
        console.error('Token validation error:', error);
        throw error;
    }
}

export function getAuthToken() {
    // Check URL parameters first (e.g., after login redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
        console.log('Token found in URL, saving to localStorage...');
        // Save to localStorage and clear URL
        localStorage.setItem('auth_token', tokenFromUrl);

        // Clean URL without reloading
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        return tokenFromUrl;
    }

    const storedToken = localStorage.getItem('auth_token');

    // Debug: Check if old key exists
    if (!storedToken) {
        const oldToken = localStorage.getItem('token');
        if (oldToken) {
            console.log('Found old token key, migrating...');
            localStorage.setItem('auth_token', oldToken);
            localStorage.removeItem('token');
            return oldToken;
        }
    }

    if (storedToken) {
        console.log('Token found in localStorage');
    } else {
        console.log('No token found');
    }
    return storedToken;
}

export function logout() {
    console.log('Logging out...');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data'); // Clear user data too
    window.location.href = '/login';
}
