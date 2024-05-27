document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');

    // Function to render games based on search input
    function renderGames(data, searchTerm) {
        gameContainer.innerHTML = ''; // Clear previous results

        if (!searchTerm) {
            // If search term is empty, render all games
            data.forEach(game => renderGame(game));
        } else {
            // If search term is provided, filter and render matching games
            const filteredGames = data.filter(game => game && game.name && game.name.toLowerCase().includes(searchTerm.toLowerCase()));
            filteredGames.forEach(game => renderGame(game));
        }
    }

    // Function to render a single game
    function renderGame(game) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        if (game.clickFunction) {
            imageContainer.onclick = new Function(game.clickFunction);
        } else {
            imageContainer.onclick = function () {
                window.location.href = game.url;
            };
        }

        const img = document.createElement('img');
        img.src = game.img || ''; // Provide default value for missing image
        img.alt = game.name || ''; // Provide default value for missing name
        img.classList.add('image');

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.textContent = game.title || ''; // Provide default value for missing title

        imageContainer.appendChild(img);
        imageContainer.appendChild(overlay);

        gameContainer.appendChild(imageContainer);
    }

    // Fetch games data from JSON
    fetch('/json/games.json')
        .then(response => response.json())
        .then(data => {
            renderGames(data, ''); // Initial render

            // Event listener for search input
            document.getElementById('searchInput').addEventListener('input', function () {
                renderGames(data, this.value);
            });
        })
        .catch(error => console.error('Error fetching the games data:', error));
});
