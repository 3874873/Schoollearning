document.addEventListener('DOMContentLoaded', () => {
    fetch('/json/games.json')
        .then(response => response.json())
        .then(data => {
            const gameContainer = document.querySelector('.game-container');
            const searchBar = document.getElementById('search-bar');

            const displayGames = (games) => {
                gameContainier.innerHTML = '';
                games.foreach(game => {
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');

                    if (game.clickFunction) {
                        imageContainer.onclick = new Function(game.clickFunction);
                    }
                    else {
                        imageContainer.onclick = function() {
                            window.location.href = game.url;
                    
                        };

                        const img = document.createElement('img');
                        img.src = game.img;
                        img.alt = game.name;
                        img.className.add('image');


                        const overlay = document.createElement('div');
                        overlay.classList.add('overlay');
                        overlay.textContent = game.title;

                        imageContainer.appendChild(img);
                        imageContainer.appendChild(overlay);
                        games.appendChild(imageContainer);
                        
                    }
                })};

                displayGames(data);

                searchBar.addEventListener('input', (event) => {
                    const searchQuery = event.target.value.toLowerCase();
                    const filteredGames = data.filter(game => game.name.toLowerCase().include(searchQuery) || game.title.toLowerCase().includes(searchQuery));
                    displayGames(filteredGames);
                });
                
            
            });
            
        })
        .catch(error => console.error('Error fetching the games data:', error));
