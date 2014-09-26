function onTimeUpdate(overlay) {
  return function () {
    var updatedWidth = this.currentTime * 300 / this.duration;
    overlay.width(updatedWidth + 'px');
  };
}

$(document).ready(function () {
  $('.player').each(function () {
    var player = $(this);
    player.on('timeupdate', onTimeUpdate(player.prev().find('.overlay')));
  });
});
