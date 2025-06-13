const visitMessage = document.getElementById('visit-message');
const msToDays = 86400000;
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffMs = now - Number(lastVisit);
    const diffDays = Math.floor(diffMs / msToDays);
    if (diffMs < msToDays) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
}

localStorage.setItem('lastVisit', now);

setTimeout(() => {
    visitMessage.classList.add('hide');
}, 5000);
