document.addEventListener('DOMContentLoaded', (event) => {
    const tabSwitcher = document.getElementById('tabSwitcher');
    const originalTitle = document.title;
    const originalFavicon = document.getElementById('favicon').href;
    const cloakedTitle = 'Google Forms';
    const cloakedFavicon = '/images/forms.ico';

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to switch tab appearance
    function switchTabAppearance(isCloaked) {
        if (isCloaked) {
            document.title = cloakedTitle;
            document.getElementById('favicon').href = cloakedFavicon;
        } else {
            document.title = originalTitle;
            document.getElementById('favicon').href = originalFavicon;
        }
    }

    // Event listener for visibility change
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            switchTabAppearance(tabSwitcher.checked);
        } else {
            switchTabAppearance(false);
        }
    });

    // Event listener for switch toggle
    tabSwitcher.addEventListener('change', function () {
        setCookie('tabSwitcherState', tabSwitcher.checked, 7);
    });

    // Initialize state from cookie
    const savedState = getCookie('tabSwitcherState');
    if (savedState !== null) {
        tabSwitcher.checked = (savedState === 'true');
    }

    // Initialize appearance based on current state
    switchTabAppearance(false);
});
