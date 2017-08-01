# Spin

```blocks
let angle = 0
interaction.whileEvent(markers.marker(MarkerCode.Marker5), MarkerLoopEvent.WhileVisible, function () {
    angle += 10
    design.setRotation(markers.marker(MarkerCode.Marker5), angle)
})
design.setShape(markers.marker(MarkerCode.Marker5), Shape.Box)
design.setColor(markers.marker(MarkerCode.Marker5), colors.named(Colors.Purple))
angle = 0
```