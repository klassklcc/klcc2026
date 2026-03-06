(function() {
    function updateCompetitionElements() {
        const now = new Date().getTime();
        
        document.querySelectorAll('[data-unlock]').forEach(el => {
            // "Z" ensures the string is treated as UTC/GMT
            const unlockString = el.getAttribute('data-unlock');
            const unlockTime = new Date(unlockString.endsWith('Z') ? unlockString : unlockString + "Z").getTime();
            const isUnlocked = now >= unlockTime;

            if (el.tagName === 'DIV') {
                // For Question Squares: Completely remove or show
                el.style.setProperty('display', isUnlocked ? 'block' : 'none', 'important');
            } 
            else if (el.tagName === 'A') {
                // For Sidebar Links: Disable interaction and fade
                if (isUnlocked) {
                    el.style.pointerEvents = "auto";
                    el.style.opacity = "1";
                    el.style.cursor = "pointer";
                    el.onclick = null; 
                } else {
                    el.style.pointerEvents = "none";
                    el.style.opacity = "0.5";
                    el.style.cursor = "not-allowed";
                    // Prevent any accidental clicks
                    el.onclick = function(e) { 
                        e.preventDefault(); 
                        return false; 
                    };
                }
            }
        });
    }

    // 1. Run immediately to catch the "quick clickers"
    updateCompetitionElements();

    // 2. Run every second to unlock in real-time
    setInterval(updateCompetitionElements, 1000);

    // 3. Backup: Run when window fully loads
    window.addEventListener('load', updateCompetitionElements);
})();
