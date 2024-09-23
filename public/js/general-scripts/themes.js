function applyTheme(theme) {
    document.body.setAttribute('theme', theme);
    localStorage.setItem('theme', theme);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'main';
    applyTheme(savedTheme);

    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = savedTheme;
        themeSelect.addEventListener('change', () => {
            applyTheme(themeSelect.value);
        });
    }
}

initializeTheme();
