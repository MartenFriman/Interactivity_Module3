// enable vibration support
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

canvas.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);

var xPos;
var yPos;
var strings1x = canvas.width/5;
var strings2x = (canvas.width/5)*2;
var strings3x = (canvas.width/5)*3;
var strings4x = (canvas.width/5)*4;
var stringsx = [strings1x, strings2x, strings3x, strings4x];

var still = 0;
var strummed = 1;
var vibrating = 2;
var stringsStrummed = [still, still, still, still];
var stringVibration = [0, 0, 0, 0];
var vibrationX = [0, 0, 0, 0];

var currentString = 5;
var touch;

var loopTimer;

var obj = document.getElementById('canvas');  //Load canvas and prepare for drawing
var ctx=obj.getContext("2d");

for(i=0; i < 4; i++) {      //Draw still strings at start
  console.log(stringsx[1]);
  ctx.beginPath();
  ctx.lineWidth = 14-(i*2);
  ctx.moveTo(stringsx[i],0);
  ctx.lineTo(stringsx[i], 600);
  ctx.stroke();
}

if (navigator.vibrate) {
	// vibration API supported
}

//MANAGES VISUAL VIBRATION OF GUITAR STRINGS
function handleStrings() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);    //Clear canvas
  for (i = 0; i < 4; i++) {                            //iterate through strings
    if(xPos > stringsx[i]-20 && xPos < stringsx[i]+20) {  //Check if touching string
      stringsStrummed[i] = strummed;                          //Change state of string to strummed
    }
    if(stringsStrummed[i] === strummed && xPos > stringsx[i]-160 && xPos < stringsx[i]+160) { //Constrain length string can be drawn
      navigator.vibrate(100000);
      currentString = i;
      console.log("HIT")
      ctx.beginPath();
      ctx.lineWidth = 14-(i*2);
      ctx.moveTo(stringsx[i],0);
      ctx.lineTo(xPos, yPos);
      ctx.lineTo(stringsx[i],canvas.height);
      ctx.stroke();
    } else if (stringsStrummed[i] === strummed) {
      setupVibration(i);
      navigator.vibrate(0);
    }
     if (stringsStrummed[i] === vibrating) {           //Check if string is supposed to vibrate
       ctx.beginPath();                                //Draw vibrating string
       ctx.lineWidth = 14-(i*2);
       ctx.moveTo(stringsx[i],0);
       ctx.lineTo(vibrationX[i], canvas.height/2);
       ctx.lineTo(stringsx[i],canvas.height);
       ctx.stroke();
       if (stringVibration[i] < 1) {                   //Determine if string should stop vibrating
         console.log("STOPPED");
         stringVibration[i] = 0;                       //Reset variables
         stringsStrummed[i] = still;
         ctx.beginPath();                              //Draw still string (temporary)
         ctx.lineWidth = 14-(i*2);
         ctx.moveTo(stringsx[i], 0);
         ctx.lineTo(stringsx[i],canvas.height);
         ctx.stroke();
       }
       if (vibrationX[i] < stringsx[i]) {                  //These check at which point of the vibration the string is, and reverses it
         stringVibration[i] *=0.97;                        //Speed at which vibration diminishes
         vibrationX[i] = stringsx[i]+stringVibration[i];   //Reverse string
       }else if (vibrationX[i] > stringsx[i]) {
         stringVibration[i] *=0.97;
         vibrationX[i] = stringsx[i]-stringVibration[i];
       }
     } else if (stringsStrummed[i] != strummed){
       ctx.beginPath();                              //Draw still string for non-vibrating strings
       ctx.lineWidth = 14-(i*2);
       ctx.moveTo(stringsx[i], 0);
       ctx.lineTo(stringsx[i],canvas.height);
       ctx.stroke();
     }
  }
}

loopTimer = setInterval(handleStrings, 16);


function setupVibration(inputString) {
  stringsStrummed[inputString] = vibrating;
  vibrationX[inputString] = xPos;
  if (xPos < stringsx[inputString]) {
    stringVibration[inputString] = stringsx[inputString] - xPos;
  } else {
    stringVibration[inputString] = xPos - stringsx[inputString];
  }
}

obj.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    touch = event.targetTouches[0];
    // Place element where the finger is
    obj.style.left = touch.pageX + 'px';
    obj.style.top = touch.pageY + 'px';
    xPos = touch.pageX;
    yPos = touch.pageY;
  }
}, false);

obj.addEventListener('touchend', function(event) {
  if (event.changedTouches.length == 1) {
    console.log("TOUCH ENDED");
    navigator.vibrate(0);
    if (stringsStrummed[currentString] != vibrating) {
      setupVibration(currentString);
    }
  }
}, false);
