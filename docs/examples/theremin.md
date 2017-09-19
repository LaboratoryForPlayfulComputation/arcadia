# Theremin

```blocks-ignore
interaction.whileEvent(MarkerCode.Marker0, MarkerLoopEvent.WhileVisible, function () {
    music.setVolume(
    markers.mapPosition(MarkerCode.Marker0, Axes.x, 0, 100)
    )
    music.oscFreq(Wave.Sine, markers.mapPosition(MarkerCode.Marker0, Axes.y, 131, 998))
})
music.startOsc(Wave.Sine)
```
