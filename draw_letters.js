/* these are optional special variables which will change the system */
var systemBackgroundColor = "#19327f";//"#acf2e7";
var systemLineColor = "#000090";
var systemBoxColor = "#C73869";

/* internal constants */
const darkGreen  = "#26b29d";
const lightGreen  = "#30dfc4";
const strokeColor  = "#0a2d27";

/*
 * Draw the letter given the letterData
 *
 * Letters should always be drawn with the
 * following bounding box guideline:
 * from (0,0) to (100, 200)
 */
function drawLetter(letterData) {

  // Calling the two variables from letter.js
  let triangles = letterData.triangles || alphabet["default"].triangles;
  let triangleColors = letterData.triangleColors || alphabet["default"].triangleColors;

  noStroke();

  // Origin point
  let posx = 50;
  let posy = 150;

  // Checking if any of the data for the triangles are missing
  if (!letterData.triangles) {
    console.warn("Missing triangle data for letter:", letterData);
  }
  // Draws the 3 triangles from the triangle data
  for (let i = 0; i < triangles.length; i++) {
    fill(triangleColors[i % triangleColors.length]);
    let t = triangles[i];
    triangle(posx + t[0], posy + t[1],
             posx + t[2], posy + t[3],
             posx + t[4], posy + t[5]);
  }
}

// Trying to have the interpolation of colors transition smoothly
function interpolateColor(c1, c2, amt) {
  let col1 = color(c1);
  let col2 = color(c2);
  let r = lerp(red(col1),   red(col2),   amt);
  let g = lerp(green(col1), green(col2), amt);
  let b = lerp(blue(col1),  blue(col2),  amt);
  return color(r, g, b);
}


function interpolate_letter(percent, oldObj, newObj) {
  let newLetter = { triangles: [], triColors: [] };

  let oldTriangles = oldObj.triangles || [];
  let newTriangles = newObj.triangles || [];

  let triangleCount = Math.min(oldTriangles.length, newTriangles.length);

  // Have the transition of each of the 3 triangles morph smooth
  for (let i = 0; i < triangleCount; i++) {
    let oldT = oldTriangles[i];
    let newT = newTriangles[i];
    let interpolated = [];

    for (let j = 0; j < 6; j++) {
      interpolated.push(
        map(percent, 0, 100, oldT[j], newT[j])
      );
    }

    newLetter.triangles.push(interpolated);
  }

  //Setting up the interpolation for the colors
  let oldColors = oldObj.triColors || alphabet["default"].triangleColors;
  let newColors = newObj.triColors || alphabet["default"].triangleColors;

  for (let i = 0; i < triangleCount; i++) {
    let c1 = oldColors[i % oldColors.length];
    let c2 = newColors[i % newColors.length];
    newLetter.triColors.push(interpolateColor(c1, c2, percent / 100));
  }


  return newLetter;
}

var swapWords = [
  "ABBAABBA",
  "CAB?CAB?",
  "BAAAAAAA"
]
