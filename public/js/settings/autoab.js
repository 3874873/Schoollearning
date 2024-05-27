// Utility function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Utility function to get a cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Initialize the switch based on cookie value
const scriptToggle = document.getElementById('scriptToggle');
const scriptEnabled = getCookie('scriptEnabled') === 'true';
scriptToggle.checked = scriptEnabled;

// Event listener for switch toggle
scriptToggle.addEventListener('change', (event) => {
    const enabled = event.target.checked;
    setCookie('scriptEnabled', enabled, 7);
    location.reload(); // Reload the page to apply the change
});

// Cloaking script
if (scriptEnabled) {
    let inFrame;

    try {
        inFrame = window !== top;
    } catch (e) {
        inFrame = true;
    }

    if (!inFrame && !navigator.userAgent.includes("Firefox")) {
        const popup = open("about:blank", "_blank");
        if (!popup || popup.closed) {
            alert("History Hider failed to cloak this site, allow popups and reload.");
        } else {
            const doc = popup.document;
            const iframe = doc.createElement("iframe");
            const style = iframe.style;
            const link = doc.createElement("link");

            const name = localStorage.getItem("name") || "Home";
            const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/classroom/favicon.png";

            doc.title = name;
            link.rel = "icon";
            link.href = icon;

            iframe.src = location.href;
            style.position = "fixed";
            style.top = style.bottom = style.left = style.right = 0;
            style.border = style.outline = "none";
            style.width = style.height = "100%";

            doc.head.appendChild(link);
            doc.body.appendChild(iframe);
            location.replace("https://www.google.com/search?q=math+help&rlz=1CAXXPU_enUS1087&oq=math+help&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIPCAEQABgKGIMBGLEDGIAEMgcIAhAAGIAEMgcIAxAAGIAEMgcIBBAAGIAEMgkIBRAAGAoYgAQyBwgGEAAYgAQyBggHEEUYQdIBCDIyMjhqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8&safe=active&ssui=on");
        }
    }
}