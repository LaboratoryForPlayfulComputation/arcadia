# Timer

```blocks
let count = 0
count = 10
while (count > 0) {
    design.setNumber(markers.marker(MarkerCode.Marker5), count)
    count += -1
    loops.pause(1000)
}
design.setColor(markers.marker(MarkerCode.Marker5), colors.named(Colors.Red))
design.setNumber(markers.marker(MarkerCode.Marker5), 0)
music.playTone(Note.C, BeatFraction.Whole)
```

![alt text](/static/timer.gif)