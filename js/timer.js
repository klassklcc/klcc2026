function updateCompetitionElements() {
    // Get current time (Works regardless of user's local timezone)
    const now = new Date().getTime();
    
    // Find everything with a data-unlock attribute
    document.querySelectorAll('[data-unlock]').forEach(el => {
        const unlockTime = new Date(el.getAttribute('data-unlock') + "Z").getTime();
        const isPastTime = now >= unlockTime;

        // CHECK TAG TYPE: Is it a DIV or an Anchor?
        if (el.tagName === 'DIV') {
            // DIV LOGIC: Completely disappear/appear
            el.style.display = isPastTime ? "block" : "none";
        } 
        else if (el.tagName === 'A') {
            // LINK LOGIC: Fade out/in but stay visible
            if (isPastTime) {
                el.style.pointerEvents = "auto";
                el.style.opacity = "1";
                el.style.cursor = "pointer";
            } else {
                el.style.pointerEvents = "none";
                el.style.opacity = "0.5";
                el.style.cursor = "not-allowed";
                el.onclick = (e) => e.preventDefault();
            }
        }
    });
}

// Run every second
setInterval(updateCompetitionElements, 1000);
// Run immediately on page load
window.addEventListener('load', updateCompetitionElements);
