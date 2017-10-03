# Rainbow Paintbrush

```blocks
loops.forever(function () {
    paint.setBrushColor(markers.marker(MarkerCode.Marker3), Math.randomRange(colors.named(Colors.Black), colors.named(Colors.White)))
})
paint.setBrushMode(markers.marker(MarkerCode.Marker3), Toggle.on)
```