import { getAuthToken, getUser, logout } from './api.js';
import { startTokenSetup } from './tasks/token-setup/index.js';

async function initApp() {
    const token = getAuthToken();

    if (!token) {
        // Not logged in, redirect to login
        window.location.href = '/login';
        return;
    }

    try {
        const user = await getUser(token);
        if (!user) {
            logout(); // Invalid token
            return;
        }

        renderDashboard(user);

        // Check for missing tokens and launch wizard
        checkTokenStatus(user);

    } catch (error) {
        console.error('App init error:', error);
        // Show error state
        document.getElementById('app').innerHTML = `
            <div style="text-align:center; padding: 2rem;">
                <h2>Something went wrong</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
    }
}

function renderDashboard(user) {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="dashboard">
            <header class="user-header">
                <div class="user-info">
                    <h1>👋 Welcome back, ${user.name}!</h1>
                    <p class="subtitle">Here's your research overview for today.</p>
                </div>
                <button id="logout-btn" class="logout-btn">Sign Out</button>
            </header>

            <div class="task-grid" id="task-grid">
                <!-- Task Cards will be inserted here -->
                
                <!-- 1. Connect Tools (Status Card) -->
                ${renderTaskCard({
        title: 'Research Tools',
        icon: '🔗',
        description: 'Manage your API connections to GitHub, Scopus, IEEE, and more.',
        actionText: 'Manage Connections',
        onClick: 'openTokenWizard'
    })}

                <!-- 2. Find Papers -->
                ${renderTaskCard({
        title: 'Find Papers',
        icon: '📚',
        description: 'Search across multiple databases simultaneously.',
        actionText: 'Start Search',
        onClick: 'alert("Search feature coming soon!")'
    })}
            </div>
        </div>
    `;

    // Attach Events
    document.getElementById('logout-btn').addEventListener('click', logout);

    // Quick hack for demo interaction (ideally delegate events)
    window.openTokenWizard = () => {
        startTokenSetup(user);
    };
}

function renderTaskCard({ title, icon, description, actionText, onClick }) {
    return `
        <div class="task-card">
            <div class="task-icon">${icon}</div>
            <div class="task-content">
                <h3 class="task-title">${title}</h3>
                <p class="task-description">${description}</p>
            </div>
            <button class="task-action" onclick='${onClick}'>
                ${actionText} →
            </button>
        </div>
    `;
}

function checkTokenStatus(user) {
    // List of required tokens
    const requiredTokens = ['token_github', 'token_pubmed', 'token_scopus', 'token_ieee', 'token_z'];

    const missing = requiredTokens.filter(t => !user[t]);

    if (missing.length > 0) {
        console.log('Missing tokens detected:', missing);
        // Launch wizard automatically if tokens are missing
        startTokenSetup(user);
    }
}

// Start the app
initApp();
