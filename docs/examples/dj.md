# DJ

```blocks
let chorus = false
let distortion = false
interaction.onEvent(markers.marker(MarkerCode.Marker0), MarkerEvent.Hidden, function () {
    distortion = !(distortion)
    if (distortion) {
        fx.addEffect(Effect.Distortion)
    } else {
        fx.removeEffect(Effect.Distortion)
    }
})
loops.forever(function () {
    music.setTempo(
    markers.mapRotationToRange(markers.marker(MarkerCode.Marker3), 80, 140)
    )
    music.setVolume(
    interaction.slider(markers.marker(MarkerCode.Marker1), markers.marker(MarkerCode.Marker5), markers.marker(MarkerCode.Marker7)) + 100
    )
    music.playTone(Note.E, BeatFraction.Quarter)
    music.playTone(Note.A, BeatFraction.Quarter)
    music.playTone(Note.G, BeatFraction.Quarter)
    music.playTone(Note.D5, BeatFraction.Quarter)
    music.playTone(Note.A, BeatFraction.Quarter)
    music.playTone(Note.E, BeatFraction.Quarter)
})
interaction.onEvent(markers.marker(MarkerCode.Marker4), MarkerEvent.Hidden, function () {
    chorus = !(chorus)
    if (chorus) {
        fx.addEffect(Effect.Chorus)
    } else {
        fx.removeEffect(Effect.Chorus)
    }
})
distortion = false
chorus = false
```
