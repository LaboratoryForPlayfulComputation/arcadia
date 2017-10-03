# Dinner Spinner

```blocks-ignore
let rotation = 0
loops.forever(function () {
    rotation = markers.mapRotationToRange(markers.marker(MarkerCode.Marker3), 0, 100)
    if (rotation >= 0 && rotation < 25) {
        design.setText(markers.marker(MarkerCode.Marker1), "pizza")
    } else if (rotation >= 25 && rotation < 50) {
        design.setText(markers.marker(MarkerCode.Marker1), "thai")
    } else if (rotation >= 50 && rotation < 75) {
        design.setText(markers.marker(MarkerCode.Marker1), "greek")
    } else {
        design.setText(markers.marker(MarkerCode.Marker1), "subs")
    }
})
```
![alt text](/static/dinner-spinner.gif)
