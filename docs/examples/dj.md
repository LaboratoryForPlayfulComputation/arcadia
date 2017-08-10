# DJ

```blocks
let chorus = false
let distortion = false
interaction.onEvent(MarkerCode.Marker0, MarkerEvent.Hidden, function () {
    distortion = !(distortion)
    if (distortion) {
        fx.addEffect(Effect.Distortion)
    } else {
        fx.removeEffect(Effect.Distortion)
    }
})
loops.forever(function () {
    music.setTempo(
    markers.mapRotation(MarkerCode.Marker3, 80, 140)
    )
    music.setVolume(
    markers.slider(MarkerCode.Marker1, MarkerCode.Marker5, MarkerCode.Marker7) + 100
    )
    music.playTone(Note.E, BeatFraction.Quarter)
    music.playTone(Note.A, BeatFraction.Quarter)
    music.playTone(Note.G, BeatFraction.Quarter)
    music.playTone(Note.D5, BeatFraction.Quarter)
    music.playTone(Note.A, BeatFraction.Quarter)
    music.playTone(Note.E, BeatFraction.Quarter)
})
interaction.onEvent(MarkerCode.Marker4, MarkerEvent.Hidden, function () {
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
