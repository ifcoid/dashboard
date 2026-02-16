export class Wizard {
    constructor({ steps, onComplete, onSkip }) {
        this.steps = steps;
        this.currentStep = 0;
        this.onComplete = onComplete;
        this.onSkip = onSkip;
        this.data = {};

        this.overlay = null;
    }

    render() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'wizard-overlay';

        this.overlay.innerHTML = `
            <div class="wizard-card">
                <div class="wizard-header">
                    <h2 class="wizard-title">Setup Your Research Tools</h2>
                    <p class="wizard-subtitle">Step <span id="wizard-step-num">1</span> of ${this.steps.length}</p>
                    <div class="wizard-progress">
                        ${this.steps.map((_, i) => `
                            <div class="step-indicator ${i === 0 ? 'active' : ''}" id="step-indicator-${i}"></div>
                        `).join('')}
                    </div>
                </div>

                <div class="wizard-content" id="wizard-steps-container">
                    ${this.steps.map((step, i) => this.renderStep(step, i)).join('')}
                </div>

                <div class="wizard-footer">
                    <button class="btn-secondary" id="wizard-skip-btn">Skip for now</button>
                    <button class="btn-primary" id="wizard-next-btn">Next Step →</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.overlay);
        this.attachEvents();
        this.updateView();
    }

    renderStep(step, index) {
        return `
            <div class="wizard-step ${index === 0 ? 'active' : ''}" data-step="${index}">
                <div class="step-icon">${step.icon}</div>
                <h3 style="text-align: center; margin-bottom: 0.5rem;">${step.title}</h3>
                <p class="step-description">${step.description}</p>
                
                <div class="form-group">
                    <label class="form-label">${step.inputLabel}</label>
                    <input type="text" class="form-input" 
                        placeholder="${step.placeholder}" 
                        id="input-step-${index}"
                        autocomplete="off">
                    <div class="input-helper">
                        <a href="${step.helpLink}" target="_blank">Get your token here ↗</a>
                    </div>
                </div>
            </div>
        `;
    }

    attachEvents() {
        const nextBtn = this.overlay.querySelector('#wizard-next-btn');
        const skipBtn = this.overlay.querySelector('#wizard-skip-btn');

        nextBtn.addEventListener('click', () => this.next());
        skipBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to skip setup? Some features might not work.')) {
                this.close();
                if (this.onSkip) this.onSkip();
            }
        });

        // Enter key support
        this.overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.next();
        });
    }

    next() {
        const input = this.overlay.querySelector(`#input-step-${this.currentStep}`);
        const value = input.value.trim();
        const currentStepConfig = this.steps[this.currentStep];

        // Validation (if required)
        if (currentStepConfig.required && !value) {
            input.focus();
            input.style.borderColor = 'red';
            return;
        }

        // Save data
        if (value) {
            this.data[currentStepConfig.field] = value;
        }

        // Move to next step or finish
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.updateView();
        } else {
            this.complete();
        }
    }

    updateView() {
        // Update Step Counter
        this.overlay.querySelector('#wizard-step-num').textContent = this.currentStep + 1;

        // Update Progress Indicators
        this.steps.forEach((_, i) => {
            const indicator = this.overlay.querySelector(`#step-indicator-${i}`);
            indicator.className = `step-indicator ${i === this.currentStep ? 'active' : i < this.currentStep ? 'completed' : ''}`;
        });

        // Show Current Step
        const steps = this.overlay.querySelectorAll('.wizard-step');
        steps.forEach(step => step.classList.remove('active'));
        steps[this.currentStep].classList.add('active');

        // Focus Input
        setTimeout(() => {
            const input = this.overlay.querySelector(`#input-step-${this.currentStep}`);
            if (input) input.focus();
        }, 100);

        // Update Button Text Logic
        const nextBtn = this.overlay.querySelector('#wizard-next-btn');
        if (this.currentStep === this.steps.length - 1) {
            nextBtn.textContent = 'Finish Setup 🎉';
        } else {
            nextBtn.textContent = 'Next Step →';
        }
    }

    async complete() {
        const nextBtn = this.overlay.querySelector('#wizard-next-btn');
        nextBtn.textContent = 'Saving...';
        nextBtn.disabled = true;

        if (this.onComplete) {
            await this.onComplete(this.data);
        }
        this.close();
    }

    close() {
        // Animate out
        this.overlay.style.opacity = '0';
        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
        }, 300);
    }
}
