# Writing your first AR program

Open the editor at @homeurl@ in Chrome. You can download Chrome [here](https://www.google.com/chrome/browser/). 
  
A quick way to test if your marker is working (i.e. recognized by the application) is to simply hold it up to the camera. If your marker is working a randomly colored cube will appear on your marker in the video feed.

![alt text](/static/markers-blank.png)
![alt text](/static/colored-cubes.png)

A good activity to do to help you get started is to make an AR piano. To do this you will want to use at least 2 unique markers, if you haven't prepared your markers yet you'll want to read the [about](/about) and [preparing your markers](/markers) pages.

Once you have your markers, it's time to code!

For this example we will be using markers 3 and 6, but you may use any that you'd like.
![alt text](/static/AR_MARKER_CODES/03-small.png)![alt text](/static/AR_MARKER_CODES/06-small.png)

Let's start by adding an `on marker visible` event. Look for this block in the *interaction* drawer in the lefthand menu and drag it into the workspace. If you're using different markers, make sure your marker matches the image of the marker in the dropdown of the block.
```blocks
interaction.onEvent(markers.marker(MarkerCode.Marker3), MarkerEvent.Visible, function () {

})
```

Now let's make some sounds. Go to the *music* drawer and find the `play tone` block and place it inside of the `on marker visible` block.
```blocks
interaction.onEvent(markers.marker(MarkerCode.Marker3), MarkerEvent.Visible, function () {
    music.playTone(Note.C, BeatFraction.Quarter)
})
```

Let's test this out. Using the marker that matches the one you just wrote code for, hold it up in front of your webcam. When the marker is detected by the camera you should hear a tone play. Try covering the marker with your hand and then removing your hand, you should hear the tone again.
![alt text](/static/piano1.gif)
Note: notice in the video above how the user is holding the marker. She is not covering the marker with her fingers. It is useful to have the carboard a little thicker than the marker itself to make it easier to hold like this.

Now, let's use our second marker to play another note. The code for this marker will look nearly identical to what you have already, except we must change the marker in the dropdown and also pick a new note for the `play tone` block.
```blocks
interaction.onEvent(markers.marker(MarkerCode.Marker3), MarkerEvent.Visible, function () {
    music.playTone(Note.C, BeatFraction.Quarter)
})
interaction.onEvent(markers.marker(MarkerCode.Marker6), MarkerEvent.Visible, function () {
    music.playTone(Note.E, BeatFraction.Quarter)
})
```

Now you have a two note piano! If you'd like to add more notes to your piano you'll just need to create more markers and write similar code for them.
  
Here are links to some other pages to help you get started!
* [About](/about)
* [Preparing your markers](/markers)
* [Example projects](/examples)
