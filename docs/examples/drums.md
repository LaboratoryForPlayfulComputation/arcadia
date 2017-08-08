# Drums

```blocks
interaction.onEvent(markers.marker(MarkerCode.Marker2), MarkerEvent.Visible, function () {
    music.playDrum(Drum.Kick)
})
interaction.onMultiEvent(markers.marker(MarkerCode.Marker2), MultiMarkerEvent.Touching, markers.marker(MarkerCode.Marker5), function () {
    music.playDrum(Drum.Splat)
})
interaction.onEvent(markers.marker(MarkerCode.Marker2), MarkerEvent.Hidden, function () {
    music.playDrum(Drum.Snare)
})
design.setShape(markers.marker(MarkerCode.Marker2), Shape.Sphere)
```
