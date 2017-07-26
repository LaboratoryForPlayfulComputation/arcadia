#Rainbow Paintbrush

```blocks
loops.forever(function () {
    design.setBrushColor(markers.marker(MarkerCode.Marker3), Math.randomRange(colors.named(Colors.Black), colors.named(Colors.White)))
})
design.setBrushMode(markers.marker(MarkerCode.Marker3), Toggle.on)
```