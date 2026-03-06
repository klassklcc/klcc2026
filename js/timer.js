(function() {
    function updateCompetitionElements() {
        const now = new Date().getTime();
        
        document.querySelectorAll('[data-unlock]').forEach(el => {
            const unlockString = el.getAttribute('data-unlock');
            // If there's no unlock attribute, don't touch this element
            if (!unlockString) return;

            const unlockTime = new Date(unlockString.endsWith('Z') ? unlockString : unlockString + "Z").getTime();
            const isUnlocked = now >= unlockTime;

            if (el.tagName === 'DIV') {
                el.style.setProperty('display', isUnlocked ? 'block' : 'none', 'important');
            } 
            else if (el.tagName === 'A') {
                if (isUnlocked) {
                    // Fully visible and clickable
                    el.style.opacity = "1";
                    el.style.pointerEvents = "auto";
                    el.style.cursor = "pointer";
                    el.onclick = null; 
                } else {
                    // Dimmed and locked
                    el.style.opacity = "0.5";
                    el.style.pointerEvents = "none";
                    el.style.cursor = "not-allowed";
                    el.onclick = function(e) { 
                        e.preventDefault(); 
                        return false; 
                    };
                }
            }
        });
    }

    // Run immediately to catch quick clicks
    updateCompetitionElements();
    setInterval(updateCompetitionElements, 1000);
    window.addEventListener('load', updateCompetitionElements);
})();
