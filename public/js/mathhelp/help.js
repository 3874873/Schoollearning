async function goto(site) {
  try {
      await registerSW();
    } catch (err) {
      console.log(err);
      throw err;
    }
  
    const url = search(address.value, "https://www.google.com/search?q=%s");
  
    sessionStorage.setItem("url", __uv$config.prefix + __uv$config.encodeUrl(url))
    location.href = "/go/"
}
