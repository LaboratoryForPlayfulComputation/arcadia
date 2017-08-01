# Blinky

```blocks
interaction.onEvent(markers.marker(MarkerCode.Marker0), MarkerEvent.Visible, function () {
    music.playDrum(Drum.Kick)
})
interaction.onEvent(markers.marker(MarkerCode.Marker0), MarkerEvent.Hidden, function () {
    music.playDrum(Drum.Splat)
})
```