let canvas;

// Note related
let noteArray = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let notes = [];

// Initial setup
let root = 'C';
let octave;

// UI Related
let selectRoot;
let selectScale;
let checkbox;
let fixed = true;
let checkName;
let showNames = true;

function setup() {
  canvas = createCanvas(480, 480);
  canvas.parent('canvas-container');
  // UI
  /// ROOT
  selectRoot = select('#root').changed(setRoot);
  /// SCALE
  selectScale = select('#scaleSel').changed(setScale);
  /// OCTAVES
  select("#plus").mousePressed(setOctUp);
  select("#minus").mousePressed(setOctDown);
  /// FIXED SCALE
  checkbox = select("#fixed").changed(setFixed);
  checkNames = select("#showName").changed(setDisplayNotes);
  
  // Create notes
  createNotes();
  
  // Draw the grid;
  let defaultNote = 48; // 48 = C3
  octave = notes[defaultNote].octave;
  setScale();
  drawNotes(defaultNote);
  
  noLoop();
}

function draw() {
  
}

function drawNotes(note) {
  
  background(255);
  
  let columns = 8;
  let rows = 8;

  let gridW = canvas.width / columns;
  let gridH = canvas.height / rows;
  
  stroke(0);
  
  let n; // Starting MIDI note
  
  if(fixed) {
    n = 12 * (octave + 1);
  } else {
    n = note;
    // Fixing an issue with displaying the grid of pads on lower octaves
    if(n < 0) {
      n = n + 12;
    }
  }
  
  let x = 0;
  let y = height - gridH
  // Can't use a nested loop so I need to draw the full grid from the bottom left pad
  for(let i = 0; i < columns*rows; i++) {  
    if(i > 0 && i % columns == 0) {
      x = 0;
      y = y - gridH;
      n = n - 3; // This is needed to go up in 4ths (default layout on Push)
    } else {
      x = i % columns * gridW;
    }
    // Avoid undefined error
    if(notes[n]) {
      // Let's color the grid.
      if(notes[n].note === root) {
        fill(255, 0, 0, 100);
      } else if(scala.indexOf(notes[n].note) >= 0 ) {
        fill(255);
      } else {
        fill(127);
      }
      // Draw the grid
      rect(x, y, gridW, gridH);

      // Write the notes' names
      if(showNames) {
        textAlign(CENTER, CENTER)
        fill(0);
        text(notes[n].note+notes[n].octave, x + gridW/2, y + gridH/2);
      }
    }
    n++;
  }
  
}

let scala = [];

function setScale() {
  // Clean the array
  scala = [];
  // Find the root note
  let f = noteArray.indexOf(root);
  // Get the notes from Scale.js
  for(let j = 0; j < scales[selectScale.value()].notes.length; j++) {
   let n = f + scales[selectScale.value()].notes[j];
   if(n > 11) {
     n = n % 12;
   }
   scala.push(noteArray[n]);
  }
  console.log("Scala: "+scala);
  drawNotes(f);
}

function setDisplayNotes() {
  if(checkNames.checked()) {
    showNames = true;
  } else {
    showNames = false;
  }
  drawNotes(noteArray.indexOf(root) + (octave*12))
}

function setFixed() {
  if(checkbox.checked()) {
    fixed = true;
  } else {
    fixed = false;
  }
  drawNotes(noteArray.indexOf(root) + (octave +1)*12)
}

function setRoot() {
  root = selectRoot.value();
  setScale();
  drawNotes(noteArray.indexOf(root) + (octave +1)*12);
}

function setOctDown() {
  octave--;
  if(octave < -1) {
    octave++;
  }
  
  drawNotes(noteArray.indexOf(root) + (octave*12));
}

function setOctUp() {
  octave++;
  if(octave > 9) {
    octave--;
  }
  drawNotes(noteArray.indexOf(root) + (octave*12));
}

function Note(midi, note, octave) {
  this.midi = midi;
  this.note = note;
  this.octave = octave - 1;
}

function createNotes() {
  // Fill the Root Note selector in the UI
  for(let i = 0; i < noteArray.length; i++) {
    selectRoot.option(noteArray[i]);
  }
  // Fill the Scale Selector in the UI
  for(let i = 0; i < scales.length; i++) {
    selectScale.option(scales[i].name, i);
  }
  // Fill the Note Array with note objects
  for(let i = 0; i <= 127; i++) {
    let newNote = new Note(i, noteArray[i%12], floor(i/12));
    notes.push(newNote);
  }
  console.log(notes);
}