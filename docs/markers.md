# Markers

### Creating & Initializing an AR marker
In order to have multiple trackable markers in a single scene, we will want to use barcodes. ARToolkit has support for various other marker systems, but 2D barcodes give us a way to uniquely identify different objects. For now, using a 3x3 matrix for the barcodes seems to give us the best resolution for detecting markers while also giving us up to 64 unique barcode patterns. If you would like to change the marker detection mode, simply change the parameters for when we initialize the a-scene in simulator.html. See below for links to downloadable images of barcodes 0-63. You can either print it out or draw it using a and a black sharpie -- if you are drawing make sure your marker has a black border around that is 25% the width of the square, also you'll want a white border around that. We recommend just printing it out.

Now that you have a marker, we need to write some code so that we can track it.

![alt text](https://github.com/Microsoft/pxt-ar/blob/master/examples/example1.png)


### Markers for printing
Click on an image of marker to download and print it.

<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/00.png" width="75"><img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/01.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/02.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/03.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/04.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/05.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/06.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/07.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/08.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/09.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/10.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/11.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/12.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/13.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/14.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/15.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/16.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/17.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/18.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/19.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/20.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/21.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/22.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/23.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/24.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/25.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/26.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/27.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/28.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/29.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/30.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/31.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/32.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/33.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/34.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/35.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/36.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/37.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/38.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/39.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/40.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/41.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/42.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/43.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/44.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/45.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/46.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/47.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/48.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/49.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/50.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/51.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/52.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/53.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/54.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/55.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/56.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/57.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/58.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/59.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/60.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/61.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/62.png" width="75">
<img src="https://github.com/Microsoft/pxt-ar/blob/master/docs/static/AR_MARKER_CODES/63.png" width="75">
