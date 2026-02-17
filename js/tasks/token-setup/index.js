import { Wizard } from '../../components/wizard.js';
import { tokenSteps } from './steps.js';
import { updateUser } from '../../api.js';

export function startTokenSetup(user, onComplete, mode = 'setup') {
    // Determine steps to show
    let stepsToShow = tokenSteps;
    let wizardTitle = 'Setup Your Research Tools';

    if (mode === 'setup') {
        // In setup mode, only show missing tokens
        stepsToShow = tokenSteps.filter(step => !user[step.field]);

        if (stepsToShow.length === 0) {
            console.log('All tokens already set up!');
            if (onComplete) onComplete();
            return;
        }
    } else {
        // Update mode: Show all tokens, and set title
        wizardTitle = 'Manage Your Research Tools';
    }

    const wizard = new Wizard({
        steps: stepsToShow,
        defaultValues: user, // Pass current user data as default values
        title: wizardTitle,
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
