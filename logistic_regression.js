// x is 100 - 600  y is 0 - 400

// Delcare all variables
var x_min = 100;
var x_max = 600;
var y_min = 0;
var y_max = 400;
var num_data_points = 50;
var data_points = [];
var x_mean = 0;
var y_mean = 0;
var x_minus_mean = [];
var y_minus_mean = [];
var run = 0;
var rise = 0;
var slope = 0;
var y_intercept = 0;
var y_int = 0;

var svgns = "http://www.w3.org/2000/svg";
var container = document.getElementById('graph-log');

for (var i = 0; i < num_data_points/2; i++) {
  data_points.push([Math.floor(Math.random() * (360-110)) + 110, 400]);
}

for (var i = 0; i < num_data_points/2; i++) {
  data_points.push([Math.floor(Math.random() * (600-320)) + 320, 10]);
}

//******************************************
// Create Circles Function
//******************************************
function createCirlce(id, cx, cy, r, color, opacity) {
  var newPoint = document.createElementNS(svgns, 'circle');
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
for (point in data_points) {
  createCirlce(point, data_points[point][0], data_points[point][1], 6, 'black', 1);
  x_mean += data_points[point][0];
  y_mean += data_points[point][1];
}

x_mean  = x_mean / num_data_points;
y_mean = y_mean / num_data_points;

// Calculate Rise and Run
for (point in data_points) {
  rise += ((data_points[point][0] - x_mean) * (data_points[point][1] - y_mean));
  run += Math.pow((data_points[point][0] - x_mean),2);
}

slope = rise / run;
y_intercept = y_mean - (slope * x_mean);


function plotMeans() {
  // Create y mean and x mean lines
  createLine('x_mean', x_mean, x_mean, y_min, y_max, 'green', 3, 0.1);
  createLine('y_mean', x_min, x_max, y_mean, y_mean, 'blue', 3, 0.1);
}

function calculateLinearRegression() {
  // Plot y-intercept
  // y = mx + b
  y_int = (slope * 100) + y_intercept;
  createCirlce('y_intercept', x_min, y_int, 5, 'red', 1);

  // Plot Linear Regression Line
  y_int = (slope * x_max) + y_intercept;
  createLine('linear_regression_line', 0, x_max, y_intercept, y_int, 'blue', 1, 1, 5);
}

function plotSigmoid() {
  console.log("Slope: " + slope);
  console.log("y intercept: " + y_intercept);
  for (var i = 100; i < x_max; i+=4) {
    var z = Math.exp((slope * i) + y_intercept);
    var sigmoid_y_value = 1/(1+ Math.exp(z));
    console.log(sigmoid_y_value);
    createCirlce('sigmoid_line_dot', i, sigmoid_y_value, 1, 'red', 1);
  }
}
