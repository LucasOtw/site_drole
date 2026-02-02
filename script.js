// Create floating hearts background
function createFloatingHearts() {
    const container = document.getElementById('hearts');
    const heartSVG = `<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = heartSVG;

        const size = Math.random() * 25 + 15;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';

        const colors = ['#ff6b95', '#ff4d79', '#ff8fab', '#e84a7f', '#ffb6c1'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 13000);
    }, 400);
}

// Button escape logic
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const successOverlay = document.getElementById('successOverlay');

let escapeCount = 0;

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function moveButton(e) {
    const btn = btnYes;
    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const distance = getDistance(e.clientX, e.clientY, btnCenterX, btnCenterY);
    const triggerDistance = 120;

    if (distance < triggerDistance) {
        escapeCount++;

        const card = document.querySelector('.card');
        const cardRect = card.getBoundingClientRect();

        // Calculate escape direction (away from mouse)
        const angle = Math.atan2(btnCenterY - e.clientY, btnCenterX - e.clientX);

        // Add randomness
        const randomAngle = angle + (Math.random() - 0.5) * 1.5;
        const moveDistance = 100 + Math.random() * 80;

        let newX = btnCenterX + Math.cos(randomAngle) * moveDistance - rect.width / 2;
        let newY = btnCenterY + Math.sin(randomAngle) * moveDistance - rect.height / 2;

        // Keep within card boundaries (with padding)
        const padding = 20;
        const minX = cardRect.left + padding;
        const maxX = cardRect.right - rect.width - padding;
        const minY = cardRect.top + 200; // Below the title
        const maxY = cardRect.bottom - rect.height - padding;

        // If would go outside card, pick a random position inside
        if (newX < minX || newX > maxX || newY < minY || newY > maxY) {
            newX = minX + Math.random() * (maxX - minX);
            newY = minY + Math.random() * (maxY - minY);
        }

        // Apply position
        btn.style.position = 'fixed';
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
        btn.style.zIndex = '100';

        // Fun messages after many attempts
        if (escapeCount === 5) {
            btn.textContent = 'Hihi !';
        } else if (escapeCount === 10) {
            btn.textContent = 'Tu m\'auras pas !';
        } else if (escapeCount === 15) {
            btn.textContent = 'Essaie encore !';
        } else if (escapeCount === 20) {
            btn.textContent = 'Je suis rapide !';
        } else if (escapeCount >= 25) {
            btn.textContent = 'Clique sur Non !';
        }
    }
}

document.addEventListener('mousemove', moveButton);

// Touch support for mobile
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    moveButton({ clientX: touch.clientX, clientY: touch.clientY });
});

// No button click - show success
btnNo.addEventListener('click', () => {
    showSuccess();
});

function showSuccess() {
    successOverlay.classList.add('active');
    createConfetti();

    // Afficher la photo après 5 secondes
    setTimeout(() => {
        const photo = document.getElementById('surprisePhoto');
        photo.classList.add('visible');
    }, 5000);

    // Create lots of hearts in celebration
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>`;

            const size = Math.random() * 40 + 20;
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            heart.style.color = '#fff';
            heart.style.opacity = '0.8';
            heart.style.zIndex = '1002';

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 7000);
        }, i * 100);
    }
}

function createConfetti() {
    const colors = ['#ff6b95', '#ff4d79', '#fff', '#ffb6c1', '#ffd700', '#ff8fab'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Initialize
createFloatingHearts();
