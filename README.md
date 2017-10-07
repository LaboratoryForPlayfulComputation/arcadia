# AR editor target for Microsoft MakeCode

Try it out here: https://shadowfax6894.github.io/pxt-ar/

## Running locally

These instructions allow to run locally to modify the sample.

### Copy 3rd party dependencies

Install the following 3rd party dependencies under the ``sim`` folder as mention below:

* AR.js https://github.com/jeromeetienne/AR.js/commit/0069b8ea0ae6286524291a128e77057ae6f3d55a
* AFRAME (included in AR.js download)
* ARToolkit (included in AR.js download)
* THREE.js (included in AR.js download)
* AFRAME-typings https://github.com/devpaul/aframe-typings
* @types/three https://www.npmjs.com/package/@types/three
* Tone.js https://github.com/Tonejs/Tone.js/releases/tag/r10
* Drum samples from http://99sounds.org/


The file structure should be as follows:

```
sim\aframe.d.ts
sim\three.ts
sim\threex.d.ts
sim\threex.ts
sim\tone.d.ts
sim\tone.ts
sim\public\aframe-ar.js
sim\public\aframe.min.js
sim\public\AR.js
sim\public\audio
sim\public\blocks
sim\public\ColladaLoader.js
sim\public\fonts
sim\public\MTLLoader.js
sim\public\OBJLoader.js
sim\public\sim.css
sim\public\sim.manifest
sim\public\simulator.html
sim\public\StereoEffect.js
sim\public\STLLoader.js
sim\public\tone.min.js
sim\public\VREffect.js
sim\public\AR.js\.gitignore
sim\public\AR.js\aframe
sim\public\AR.js\data
sim\public\AR.js\three.js
sim\public\AR.js\webvr-polyfill
sim\public\AR.js\aframe\aframe-ar.js
sim\public\AR.js\aframe\build
sim\public\AR.js\aframe\build\aframe-ar.js
sim\public\AR.js\aframe\build\aframe-ar.min.js
sim\public\AR.js\data\data
sim\public\AR.js\data\dataNFT
sim\public\AR.js\data\data\camera_para.dat
sim\public\AR.js\data\data\Hiro pattern with border.pdf
sim\public\AR.js\data\data\multi-marker-deleteme.dat
sim\public\AR.js\data\data\multi-marker-hirokanji.dat
sim\public\AR.js\data\data\patt.hiro
sim\public\AR.js\data\data\patt.kanji
sim\public\AR.js\data\dataNFT\pinball.fset
sim\public\AR.js\data\dataNFT\pinball.fset3
sim\public\AR.js\data\dataNFT\pinball.iset
sim\public\AR.js\three.js\build
sim\public\AR.js\three.js\threex-arbasecontrols.js
sim\public\AR.js\three.js\threex-armarkercloak.js
sim\public\AR.js\three.js\threex-armarkercontrols.js
sim\public\AR.js\three.js\threex-armarkerhelper.js
sim\public\AR.js\three.js\threex-arsmoothedcontrols.js
sim\public\AR.js\three.js\threex-artoolkitcontext.js
sim\public\AR.js\three.js\threex-artoolkitprofile.js
sim\public\AR.js\three.js\threex-artoolkitsource.js
sim\public\AR.js\three.js\threex-arvideoinwebgl.js
sim\public\AR.js\three.js\vendor
sim\public\AR.js\three.js\build\ar.js
sim\public\AR.js\three.js\build\ar.min.js
sim\public\AR.js\three.js\vendor\jsartoolkit5
sim\public\AR.js\three.js\vendor\jsartoolkit5\build
sim\public\AR.js\three.js\vendor\jsartoolkit5\js
sim\public\AR.js\three.js\vendor\jsartoolkit5\LICENSE.txt
sim\public\AR.js\three.js\vendor\jsartoolkit5\build\artoolkit.debug.js
sim\public\AR.js\three.js\vendor\jsartoolkit5\build\artoolkit.min.js
sim\public\AR.js\three.js\vendor\jsartoolkit5\js\artoolkit.api.js
sim\public\AR.js\three.js\vendor\jsartoolkit5\js\artoolkit.three.js
sim\public\AR.js\webvr-polyfill\build
sim\public\AR.js\webvr-polyfill\src
sim\public\AR.js\webvr-polyfill\build\artoolkit-webvr-polyfill.js
sim\public\AR.js\webvr-polyfill\build\artoolkit-webvr-polyfill.min.js
sim\public\AR.js\webvr-polyfill\src\artoolkit-framedata-old.js
sim\public\AR.js\webvr-polyfill\src\artoolkit-framedata-old0.js
sim\public\AR.js\webvr-polyfill\src\artoolkit-framedata.js
sim\public\AR.js\webvr-polyfill\src\generic-webvr-polyfill.js
sim\public\AR.js\webvr-polyfill\src\main.js
sim\public\audio\.DS_Store
sim\public\audio\percussion
sim\public\audio\percussion\click.mp3
sim\public\audio\percussion\hh.mp3
sim\public\audio\percussion\kick.mp3
sim\public\audio\percussion\snare.mp3
sim\public\audio\percussion\splat.mp3
sim\public\blocks\markercode
sim\public\blocks\shape
sim\public\blocks\markercode\marker0.png
sim\public\blocks\markercode\marker1.png
sim\public\blocks\markercode\marker10.png
sim\public\blocks\markercode\marker11.png
sim\public\blocks\markercode\marker12.png
sim\public\blocks\markercode\marker13.png
sim\public\blocks\markercode\marker14.png
sim\public\blocks\markercode\marker15.png
sim\public\blocks\markercode\marker16.png
sim\public\blocks\markercode\marker17.png
sim\public\blocks\markercode\marker18.png
sim\public\blocks\markercode\marker19.png
sim\public\blocks\markercode\marker2.png
sim\public\blocks\markercode\marker20.png
sim\public\blocks\markercode\marker21.png
sim\public\blocks\markercode\marker22.png
sim\public\blocks\markercode\marker23.png
sim\public\blocks\markercode\marker24.png
sim\public\blocks\markercode\marker25.png
sim\public\blocks\markercode\marker26.png
sim\public\blocks\markercode\marker27.png
sim\public\blocks\markercode\marker28.png
sim\public\blocks\markercode\marker29.png
sim\public\blocks\markercode\marker3.png
sim\public\blocks\markercode\marker30.png
sim\public\blocks\markercode\marker31.png
sim\public\blocks\markercode\marker32.png
sim\public\blocks\markercode\marker33.png
sim\public\blocks\markercode\marker34.png
sim\public\blocks\markercode\marker35.png
sim\public\blocks\markercode\marker36.png
sim\public\blocks\markercode\marker37.png
sim\public\blocks\markercode\marker38.png
sim\public\blocks\markercode\marker39.png
sim\public\blocks\markercode\marker4.png
sim\public\blocks\markercode\marker40.png
sim\public\blocks\markercode\marker41.png
sim\public\blocks\markercode\marker42.png
sim\public\blocks\markercode\marker43.png
sim\public\blocks\markercode\marker44.png
sim\public\blocks\markercode\marker45.png
sim\public\blocks\markercode\marker46.png
sim\public\blocks\markercode\marker47.png
sim\public\blocks\markercode\marker48.png
sim\public\blocks\markercode\marker49.png
sim\public\blocks\markercode\marker5.png
sim\public\blocks\markercode\marker50.png
sim\public\blocks\markercode\marker51.png
sim\public\blocks\markercode\marker52.png
sim\public\blocks\markercode\marker53.png
sim\public\blocks\markercode\marker54.png
sim\public\blocks\markercode\marker55.png
sim\public\blocks\markercode\marker56.png
sim\public\blocks\markercode\marker57.png
sim\public\blocks\markercode\marker58.png
sim\public\blocks\markercode\marker59.png
sim\public\blocks\markercode\marker6.png
sim\public\blocks\markercode\marker60.png
sim\public\blocks\markercode\marker61.png
sim\public\blocks\markercode\marker62.png
sim\public\blocks\markercode\marker63.png
sim\public\blocks\markercode\marker7.png
sim\public\blocks\markercode\marker8.png
sim\public\blocks\markercode\marker9.png
sim\public\blocks\shape\box.png
sim\public\blocks\shape\cone.png
sim\public\blocks\shape\cylinder.png
sim\public\blocks\shape\icosahedron.png
sim\public\blocks\shape\sphere.png
sim\public\blocks\shape\tetrahedron.png
sim\public\fonts\helvetiker_regular.typeface.json
```

### Setup

The following commands are a 1-time setup after synching the repo on your machine.

* install the PXT command line
```
npm install -g pxt
```
* install typings
```
npm install -g typings
```
* install the dependencies
```
npm install
```
* install typings
```
typings install
```

### Running the local server

After you're done, simple run this command to open a local web server:
```
pxt serve
```

After making a change in the source, refresh the page in the browser.

## Updating the tools

If you would like to pick up the latest PXT build, simply run
```
pxt update
```

More instructions at https://github.com/Microsoft/pxt#running-a-target-from-localhost 


## License

MIT

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
