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
    name: 'major',
    notes: [2, 4, 5, 7, 9, 11]
  },
  {
    name: 'minor',
    notes: [2, 3, 5, 7, 8, 10]
  },
  {
    name: 'dorian',
    notes: [2, 3, 5, 7, 9, 10]
  }
]