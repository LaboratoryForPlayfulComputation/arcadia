/* TO DO: needs to be converted to typescript. 
Eventually this will all be gone once we get the blocks API going*/

/* basic range mapping function */
function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

/* web audio stuff (just for fun right now) */
var audioCtx = new AudioContext();
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination); 
var initialFreq = 440.0;
var initialVol = 0.5;
var minFreq = 261.63;
var maxFreq = 523.25;
var minVol = 0.2;
var maxVol = 1.0;
oscillator.type = 'sine';
oscillator.frequency.value = initialFreq; 
oscillator.start();
gainNode.gain.value = initialVol;    

/* AFRAME component stuff */
AFRAME.registerComponent('updateSynthParams', {
schema: {
  type: 'string'
},
init: function () {},
update: function () {},
tick: function () {
  var el = document.getElementById(this.data);
  var xPos = el.object3D.getWorldPosition().x;
  var yPos = el.object3D.getWorldPosition().y;
  if (xPos && yPos){
    oscillator.frequency.value = map_range(xPos, -3, 3, minFreq, maxFreq);
    gainNode.gain.value = map_range(yPos, -3, 3, minVol, maxVol);            
  }
},
remove: function () {},
pause: function () {},
play: function () {}
});      

/* AR stuff (now done with pure javascript instead of HTML, thank god) */
var sceneEl = document.querySelector('a-scene');
var markerEl = document.createElement('a-marker');
var boxEl = document.createElement('a-box');
var torusKnotEl = document.createElement('a-torus-knot');
var animationEl = document.createElement('a-animation');
var slider = document.createElement('ui-entity');
markerEl.setAttribute('type', 'barcode');
markerEl.setAttribute('value', '20'); 
markerEl.setAttribute('id', 'marker1'); 
markerEl.setAttribute('updateSynthParams', 'marker1'); // register the foo component to the barcode marker 20
boxEl.setAttribute('material', 'opacity: 0.75; side: double; color:purple;');
torusKnotEl.setAttribute('radius', '0.27');
torusKnotEl.setAttribute('radius-tubular', '0.05');
animationEl.setAttribute('attribute', 'rotation');
animationEl.setAttribute('to', '360 0 0');
animationEl.setAttribute('dur', '5000');
animationEl.setAttribute('easing', 'linear');
animationEl.setAttribute('repeat', 'indefinite');
sceneEl.appendChild(markerEl);
markerEl.appendChild(boxEl);
boxEl.appendChild(torusKnotEl);
torusKnotEl.appendChild(animationEl);