(() => {
  const y = Math.floor(Math.random() * 100);
  var elementStyle = document.getElementById("click").style;
  elementStyle.position = "absolute";

  elementStyle.left = `${y}%`;
  elementStyle.top = `${y}%`;
})();
