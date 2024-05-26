async function goto(site) {
    try {
        await registerSW();
      } catch (err) {
        console.log(err);
        throw err;
      }
      sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      location.href = "/go/";
}
gameElement.className = "image-container";
  gameElement.onclick = function () {
    fetch('/json/games.json')
    launch(game.link);
  };