// enable vibration support
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);

var xPos;
var yPos;
var strings1x = canvas.width/5;
var strings2x = (canvas.width/5)*2;
var strings3x = (canvas.width/5)*3;
var strings4x = (canvas.width/5)*4;
var stringsx = [strings1x, strings2x, strings3x, strings4x];

var stringsStrummed = [false, false, false, false];

var currentString = 5;
var touch;

var obj = document.getElementById('canvas');
var ctx=obj.getContext("2d");

for(i=0; i < 4; i++) {
  console.log(stringsx[1]);
  ctx.beginPath();
  ctx.moveTo(stringsx[i],0);
  ctx.lineTo(stringsx[i], 600);
  ctx.stroke();
}

if (navigator.vibrate) {
	// vibration API supported
}

function vibrateMe() {
	navigator.vibrate(10000);
	console.log("Should vibrate!")
}


obj.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    touch = event.targetTouches[0];
    // Place element where the finger is
    obj.style.left = touch.pageX + 'px';
    obj.style.top = touch.pageY + 'px';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < 4; i++) {
      if(touch.pageX > stringsx[i]-20 && touch.pageX < stringsx[i]+20) {  //Check if touching string
        stringsStrummed[i] = true;
      }
      if(stringsStrummed[i] === true && touch.pageX > stringsx[i]-220 && touch.pageX < stringsx[i]+220) {
        navigator.vibrate(1000);
        currentString = i;
        console.log("HIT")
        ctx.beginPath();
        ctx.moveTo(stringsx[i],0);
        ctx.lineTo(touch.pageX, touch.pageY);
        ctx.lineTo(stringsx[i],canvas.height);
        ctx.stroke();
      } else {
        stringsStrummed[i] = false;
        //navigator.vibrate(0);
        ctx.beginPath();
        ctx.moveTo(stringsx[i], 0);
        ctx.lineTo(stringsx[i],canvas.height);
        ctx.stroke();
      }
    }
  }
}, false);

obj.addEventListener('touchend', function(event) {
  if (event.changedTouches.length == 1) {
    console.log("STOP");
    stringsStrummed[currentString] = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < 4; i++) {
      navigator.vibrate(0);
      ctx.beginPath();
      ctx.moveTo(stringsx[i], 0);
      ctx.lineTo(stringsx[i],canvas.height);
      ctx.stroke();
    }
  }
}, false);
