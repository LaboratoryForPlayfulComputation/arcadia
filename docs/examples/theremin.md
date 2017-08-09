# Theremin

```blocks
interaction.whileEvent(markers.marker(MarkerCode.Marker0), MarkerLoopEvent.WhileVisible, function () {
    music.setVolume(
    markers.mapPosition(markers.marker(MarkerCode.Marker0), Axes.x, 0, 100)
    )
    music.oscFreq(Wave.Sine, markers.mapPosition(markers.marker(MarkerCode.Marker0), Axes.y, 131, 988))
})

music.startOsc(Wave.Sine)
```
