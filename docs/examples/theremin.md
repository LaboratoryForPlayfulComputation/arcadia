# Theremin

```blocks
interaction.whileEvent(markers.marker(MarkerCode.Marker1), MarkerLoopEvent.WhileVisible, function () {
    music.oscFreq(Wave.Sine, markers.mapPositionToRange(markers.marker(MarkerCode.Marker1), Axes.y, music.noteFrequency(131), music.noteFrequency(988)))
    music.setVolume(
    markers.mapPositionToRange(markers.marker(MarkerCode.Marker1), Axes.x, 0, 100)
    )
})
music.startOsc(Wave.Sine)
```
