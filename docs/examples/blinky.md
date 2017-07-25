# Blinky

```blocks
motion.onEvent(markers.marker(MarkerCode.Marker0), MarkerEvent.Visible, function () {
    music.playDrum(Drum.Kick)
})
motion.onEvent(markers.marker(MarkerCode.Marker0), MarkerEvent.Hidden, function () {
    music.playDrum(Drum.Splat)
})
```