(() => {
  var elementStyle = document.getElementById("click").style;
  elementStyle.position = "absolute";
  var catposi = document.getElementById("cat").style;
  catposi.position = "absolute";
  fetch(
    "https://api.giphy.com/v1/gifs/random?api_key=iwHjZ72SkauAnjI3EHgbu78QoFIFMo1R&tag=cat&rating=G&limit=1"
  )
    .then(r => r.json())
    .then(json => json.data.image_url)
    .then(imageUrl => {
      document.getElementById("cat").src = imageUrl;
    });
  setInterval(() => {
    var y = Math.floor(Math.random() * 100);
    var x = Math.floor(Math.random() * 100);
    var xcat = Math.floor(Math.random() * 100);
    var ycat = Math.floor(Math.random() * 100);
    catposi.left = `${ycat}%`;
    catposi.top = `${xcat}%`;
    elementStyle.left = `${y}%`;
    elementStyle.top = `${x}%`;
  }, 800);

  setInterval(() => {
    document.getElementById("fy").style.color =
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    document.getElementById("fy").style.fontSize = `${Math.floor(
      Math.random() * 100
    )}pt`;
    document.body.style.backgroundColor =
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  }, 500);
})();
