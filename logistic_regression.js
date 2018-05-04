// x is 100 - 600  y is 0 - 400

// Delcare all variables
var x_min = 100;
var x_max = 600;
var y_min = 0;
var y_max = 400;
var num_training_data =70;
var training_data = [];
var testing_data = [];
var color = ' ';

// Sigmoid Variables
var b_0 = .09;
var b_1 = .09;
var alpha = .000001;
var x_0 = 1;
var iterations = 1000;
var z;
var changes;

var svgns = "http://www.w3.org/2000/svg";
var container = document.getElementById('graph-log');

for (var i = 0; i < num_training_data/2; i++) {
  // training_data.push([Math.floor(Math.random() * (360-110)) + 110, 400]);
  training_data.push([(Math.random() * (2.5-0.0)).toFixed(3), 0]);
}

for (var i = 0; i < num_training_data/2; i++) {
  // training_data.push([Math.floor(Math.random() * (600-320)) + 320, 5]);
  training_data.push([(Math.random() * (5-2.5) + 2.5).toFixed(3), 1]);
}

// DO 'THE' CONVERSIONS HERE
// x = x+1 *100
// y = 400 - (y * 395)

//******************************************
// Create Circles Function
//******************************************
function createCirlce(line, id, cx, cy, r, color, opacity) {
  var newPoint = document.createElementNS(svgns, 'circle');
  if (line == 1) {
    cx = (((cx+1) * 100) + 100).toFixed(2);
    cy = 400 - (cy * 395);
  } else {
    cx = cx + 350;
    cy = 400 - (cy * 395);
  }
  newPoint.setAttributeNS(null, 'id', id);
  newPoint.setAttributeNS(null, 'cx', cx);
  newPoint.setAttributeNS(null, 'cy', cy);
  newPoint.setAttributeNS(null, 'r', r);
  newPoint.setAttributeNS(null, 'style', 'fill:' + color +'; fill-opacity:' + opacity +';');
  container.appendChild(newPoint);
}

//******************************************
// Create Lines Function
//******************************************
function createLine(id, x1, x2, y1, y2, color, width, opacity, dash) {
  var newLine = document.createElementNS(svgns,'line');
  newLine.setAttributeNS(null, 'id', id);
  newLine.setAttributeNS(null, 'x1', x1);
  newLine.setAttributeNS(null, 'x2', x2);
  newLine.setAttributeNS(null, 'y1', y1);
  newLine.setAttributeNS(null, 'y2', y2);
  newLine.setAttributeNS(null, 'style', 'stroke:' + color + '; stroke-width:' +  width + '; stroke-opacity:' +  opacity + '; stroke-dasharray:' + dash,dash + ';');
  container.appendChild(newLine);
}

// create a DOM for each data point
for (point in training_data) {
  if (training_data[point][1] == 0) {
    color = 'green';
  } else {
    color = 'purple';
  }
  createCirlce(1, 'point'+point, training_data[point][0], training_data[point][1], 5, color, .7);
  var plot_data = anime({
    targets: '#' + 'point' + point,
    r: {
      value: 1,
      easing: 'easeInOutSine',
      duration: 500
    },
    direction: 'alternate'
  });
}

//plot decision boundary
createLine("decision_boundary", x_min, x_max, (y_max/2), (y_max/2), 'blue', 1, .4, 1);

function sigmoid(z) {
  return (1/(1+Math.exp(-z)));
}
// Formula for Gradient Ascent
//========================================================
// B prime =   B   + alpha(predicted_y -  real_y) real_x
// B'_(j) := B_(j) + alpha(  ^y(i)     -  y(i)  ) x_(j)(i)
//
// initial B values (B_0 - b_n) can be random / abritrary
// x_0 is always 1, and then the real x values from the
// data will take place
//=========================================================
function plotSigmoid() {
  for (var i = 0; i < iterations; i++) {
    changes = 0;
    for (var j = 0; j < num_training_data; j++) {
      z = b_0 + (b_1 * training_data[j][0]);
      var new_b_0 = b_0 + (alpha * (sigmoid(z) - training_data[j][1]) * x_0);
      var new_b_1 = b_1 + (alpha * (sigmoid(z) - training_data[j][1]) * training_data[j][0]);
      if (new_b_0 != b_0 || new_b_1 != b_1) {
        changes++;
      }
      b_0 = new_b_0;
      b_1 = new_b_1;
    }
    if (changes == 0) {
      break;
    }
  }
  console.log("B_0: " + b_0);
  console.log("B_1: " + b_1);
  for (var i = -250; i < x_max/2; i+=2) {
    z = b_0 + (b_1 * i);
    createCirlce(0, "sigmoid_point" + i, i, sigmoid(z), 20, 'orange', 1);

    var plotSig = anime({
      targets: '#' + 'sigmoid_point' + i,
      r: {
        value: 2,
        easing: 'easeInOutSine',
        duration: 300,
      },
    });
  }
}

function plotNewData() {
  var x_val = (Math.random() * (5.0-0.0)).toFixed(3);
  z = b_0 + (b_1 * x_val);
  createCirlce(1, "testing_data", x_val, sigmoid(z), 7, 'red', .7);
}

function classify() {

}
