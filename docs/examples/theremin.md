# Theremin

```blocks
motion.whileEvent(markers.marker(MarkerCode.Marker3), MarkerLoopEvent.WhileVisible, function () {
    music.setVolume(
    markers.mapPositionToRange(markers.marker(MarkerCode.Marker3), Axes.x, 0, 100)
    )
    music.oscFreq(Wave.Sine, markers.mapPositionToRange(markers.marker(MarkerCode.Marker3), Axes.y, music.noteFrequency(131), music.noteFrequency(523)))
})
music.startOsc(Wave.Sine)
```
