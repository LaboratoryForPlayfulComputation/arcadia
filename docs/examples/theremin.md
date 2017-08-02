# Theremin

```blocks
interaction.whileEvent(markers.marker(MarkerCode.Marker0), MarkerLoopEvent.WhileVisible, function () {
    music.setVolume(
    markers.mapPositionToRange(markers.marker(MarkerCode.Marker0), Axes.x, 0, 100)
    )
    music.oscFreq(Wave.Sine, markers.mapPositionToRange(markers.marker(MarkerCode.Marker0), Axes.y, music.noteFrequency(131), music.noteFrequency(988)))
})
music.startOsc(Wave.Sine)

```
