const canvasWidth = 960;
const canvasHeight = 500;

/*
 * my three variable per letter are:
 *
   size: radius of the second circle (in pixels)
   offsetx: x offset (in pixels) of the second circle
            relative to the first one
   offsety: y offset (in pixels) of the second circle
            relative to the first one
 *
 */

// The points for the 3 triangles
const letterA = {
  triangles: [
    [-50, -50,  50, -50,   0, -125],
    [-100, 25,   0, -15, -50, -50],
    [0, -15, 100, 25, 50, -50]
  ]
}

const letterB = {
  triangles: [
    [-50, -50,  0, 25,  0, -125],
    [100, -75, 0, -125, 10, -50],
    [10, -50, 0, 25, 100, -25]
  ]
}

const letterC = {
  triangles: [
    [-50, -50,  0, 25,  0, -125],
    [100, -75, 0, -125, 0, -100],
    [0, 0, 0, 25, 100, -25]
  ]
}

const backgroundColor  = "#acf2e7";

const darkGreen  = "#26b29d";
const lightGreen  = "#30dfc4";  
const strokeColor  = "#0a2d27";

function setup () {
  // create the drawing canvas, save the canvas element
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  // color/stroke setup
  noStroke();

  // with no animation, redrawing the screen is not necessary
  noLoop();
}

function draw () {
  // clear screen
  background(backgroundColor);

  // compute the center of the canvas
  let center_x = canvasWidth / 2;
  let center_y = canvasHeight / 1.6;

  // draw the letters A, B, C from saved data
  drawLetter(center_x - 250, center_y, letterA);
  drawLetter(center_x      , center_y, letterB);
  drawLetter(center_x + 250, center_y, letterC);
}

function drawLetter(posx, posy, letterData) {

  // Creating the 3 triangles to form the letters
  fill(darkGreen);
  for (let t of letterData.triangles) {
    triangle(posx + t[0], posy + t[1],
             posx + t[2], posy + t[3],
             posx + t[4], posy + t[5]);
  }

}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}

  // determine parameters for second circle
  // let size2 = letterData["size"];
  // let pos2x = posx + letterData["offsetx"];
  // let pos2y = posy + letterData["offsety"];

  // draw two circles
  // fill(darkGreen);
  // ellipse(posx, posy, 150, 150);
  // fill(lightGreen);
  // ellipse(pos2x, pos2y, size2, size2);