# Color wheel

```blocks-ignore
let red = 0
loops.forever(function () {
    red = markers.mapRotationToRange(markers.marker(MarkerCode.Marker3), 0, 255)
    design.setColor(markers.marker(MarkerCode.Marker3), colors.rgb(red, 0, 255))
})
```

![alt text](/static/colorwheel.gif)
