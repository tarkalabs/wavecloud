document.body.onload = function () {
  var player = document.getElementById('player');
  var overlay = document.getElementById('overlay');
  var initialWidth = overlay.offsetWidth;
  player.ontimeupdate = function () {
    var updatedWidth = initialWidth * (1 - (player.currentTime / player.duration));
    console.log(updatedWidth);
    overlay.style.width = updatedWidth + 'px';
  };
};
