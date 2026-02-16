import { Wizard } from '../../components/wizard.js';
import { tokenSteps } from './steps.js';
import { updateUser } from '../../api.js';

export function startTokenSetup(user, onComplete) {
    // Filter steps based on what's already connected (optional, or force check all)
    // For now, we show all steps that are missing or show all if it's first run

    // Identify missing tokens
    const missingTokens = tokenSteps.filter(step => {
        // Check if user has this token (convert field name like 'token_github' to CamelCase or check directly if API returns matching keys)
        // Assuming API returns JSON keys like 'token_github', 'token_scopus' etc.
        return !user[step.field];
    });

    if (missingTokens.length === 0) {
        console.log('All tokens already set up!');
        if (onComplete) onComplete();
        return;
    }

    const wizard = new Wizard({
        steps: missingTokens,
        onComplete: async (data) => {
            try {
                await updateUser(user.id, data, localStorage.getItem('auth_token'));
                // Reload page or callback to refresh state
                window.location.reload();
            } catch (error) {
                alert('Failed to save tokens: ' + error.message);
            }
        },
        onSkip: () => {
            if (onComplete) onComplete();
        }
    });

    wizard.render();
}
