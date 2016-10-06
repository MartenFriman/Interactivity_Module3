// enable vibration support
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);

if (navigator.vibrate) {
	// vibration API supported
}

function vibrateMe() {
	navigator.vibrate(10000);
	console.log("Should vibrate!")
}


var obj = document.getElementById('canvas');
obj.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    obj.style.left = touch.pageX + 'px';
    obj.style.top = touch.pageY + 'px';
    if(touch.pageX > 200 && touch.pageX < 400) {
      navigator.vibrate(1000);
      console.log("HIT")
    } else {
      navigator.vibrate(0);
    }
  }
}, false);
