document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('toggleSwitch');

    // Check if the toggle state is saved in localStorage
    const savedState = localStorage.getItem('switchState');
    if (savedState === 'on') {
        toggleSwitch.checked = true;
        enableOnbeforeunload();
    } else {
        toggleSwitch.checked = false;
        disableOnbeforeunload();
    }

    toggleSwitch.addEventListener('change', (event) => {
        if (toggleSwitch.checked) {
            enableOnbeforeunload();
            localStorage.setItem('switchState', 'on');
        } else {
            disableOnbeforeunload();
            localStorage.setItem('switchState', 'off');
        }
    });
});

function enableOnbeforeunload() {
    window.onbeforeunload = function() {
        return "Are you sure you want to leave?";
    };
}

function disableOnbeforeunload() {
    window.onbeforeunload = null;
}