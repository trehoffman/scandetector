# scandetector

## Introduction

A simple library for ininitiazing input fields for barcode scanning.  Will fire a "scan" event from targeted element with a "detail" object that includes the value entered and the "entryType" ("manual" vs "barcode scanner").  The "entryType" is guessed based on the number of input events ("keyup", "keydown", or "keypress" depending on what is specified) and the difference between when the first and last input event ocurred.

## Quick Start (https://trehoffman.github.io/scandetector/)

Import the autocomplete library:

```
<script src="js/scandetector.js"></script>
```

Initialize an input with default settings ("keyup" event listener, mininum scan length of 3, time threshold of 400 milliseconds):

```
var scandetector = new ScanDetector({
 target: document.querySelector('input') //specify input elememnt in DOM
});
```

Initialize an input with "keyup" event listener, minimum scan length of 3, and a time threshold of 1000 milliseconds:

```
var scandetector = new ScanDetector({
 target: document.querySelector('input'), //specify input elememnt in DOM
 threshold: 1000
});
```

Initialize an input with "keydown" event listener, minimum scan length of 2, and a time threshold of 50 milliseconds:

```
var scandetector = new ScanDetector({
 eventType: "keydown",
 minimumScanLength: 2,
 target: document.querySelector('input'), //specify input elememnt in DOM
 threshold: 50
});
```

Capture a event "scan" from scandetector:

```
//add event listener to targeted input element in DOM
document.querySelector('input').addEventListener('scan', function(e) {
	console.log('scan', e);
	console.log(e.detail);
	/*
	examples of e.detail returned from scandetector:
	{ value: "first scan", entryType: "manual"}
	{ value: "second scan", entryType: "barcode scanning"} 
	*/
});
```

See code for further details.
