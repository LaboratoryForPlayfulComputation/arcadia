# Piano

```blocks
interaction.onEvent(markers.marker(MarkerCode.Marker3), MarkerEvent.Visible, function () {
    music.playTone(Note.C, BeatFraction.Quarter)
})
interaction.onEvent(markers.marker(MarkerCode.Marker6), MarkerEvent.Visible, function () {
    music.playTone(Note.E, BeatFraction.Quarter)
})
```