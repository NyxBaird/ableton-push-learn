/* 
 * This file is needed to visualize different scales
 *
 * To add a new scale:
 * 1. Add an object to the array
 * 2. Set the name
 * 3. Add the notes that form the scale (in semitones) from the root note
 * 
*/
let scales = [
  {
    name: 'Major',
    notes: [2, 4, 5, 7, 9, 11]
  },
  {
    name: 'Minor',
    notes: [2, 3, 5, 7, 8, 10]
  },
  {
    name: 'Dorian',
    notes: [2, 3, 5, 7, 9, 10]
  },
  {
    name: 'Mixolidian',
    notes: [2, 4, 5, 7, 9, 10]
  },
  {
    name: 'Lydian',
    notes: [2, 4, 6, 7, 9, 11]
  },
  {
    name: 'Phrygian',
    notes: [1, 3, 5, 7, 8, 10]
  },
  {
    name: 'Locrian',
    notes: [1, 3, 5, 6, 8, 10]
  },
  {
    name: 'Whole Tone',
    notes: [2, 4, 6, 8, 10]
  },
  {
    name: 'Half-whole Dim.',
    notes: [1, 3, 4, 6, 7, 9, 10]
  },
  {
    name: 'Whole-half Dim.',
    notes: [2, 3, 5, 6, 8, 9, 11]
  }
]