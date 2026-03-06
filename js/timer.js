function updateLinks() {
    const now = new Date().getTime();
    
    document.querySelectorAll('a[data-unlock]').forEach(link => {
        const unlockDate = new Date(link.getAttribute('data-unlock') + "Z"); 
        const unlockTime = unlockDate.getTime();

        if (now >= unlockTime) {
            link.style.pointerEvents = "auto";
            link.style.opacity = "1";
            link.style.display = "inline";
        } else {
            link.style.pointerEvents = "none";
            link.style.opacity = "0.5";
            link.onclick = function(e) {
                e.preventDefault();
                return false;
            };
        }
    });
}

setInterval(updateLinks, 1000);
window.addEventListener('load', updateLinks);
