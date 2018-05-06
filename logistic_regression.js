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
var new_data_num = 0;

// Sigmoid Variables
var b_0 = .5;
var b_1 = .5;
var alpha = .01;
var x_0 = 1;
var iterations = 10000;
var z;
var changes;
var x_val;

var svgns = "http://www.w3.org/2000/svg";
var container = document.getElementById('graph-log');

for (var i = 0; i < num_training_data/2; i++) {
  // training_data.push([Math.floor(Math.random() * (360-110)) + 110, 400]);
  training_data.push([(Math.random() * (3.0-0.0)), 0]);
}

for (var i = 0; i < num_training_data/2; i++) {
  // training_data.push([Math.floor(Math.random() * (600-320)) + 320, 5]);
  training_data.push([(Math.random() * (5-2.5) + 2.5), 1]);
}

document.getElementById('plot_data_btn').disabled = true;
document.getElementById('classify_btn').disabled = true;

// DO 'THE' CONVERSIONS HERE
// x = x+1 *100
// y = 400 - (y * 395)

//******************************************
// Create Circles Function
//******************************************
function createCirlce(id, cx, cy, r, color, opacity) {
  var newPoint = document.createElementNS(svgns, 'circle');
  cx = cx+1;
  cx = cx * 100;
  cy = 400 - (cy * 395);
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
  createCirlce('point'+point, training_data[point][0], training_data[point][1], 5, color, .7);
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
  return 1/(1+Math.exp(-z));
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
      var new_b_0 = b_0 - (alpha * (sigmoid(z) - training_data[j][1]) * x_0);
      var new_b_1 = b_1 - (alpha * (sigmoid(z) - training_data[j][1]) * training_data[j][0]);
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
  for (var i = 0; i < 5; i+=.002) {
    z = b_0 + (b_1 * i);
    createCirlce("sigmoid_point" + i, i, sigmoid(z), 1, 'orange', 1);

    var plotSig = anime({
      targets: '#' + 'sigmoid_point' + i,
      r: {
        value: 2,
        easing: 'easeInOutSine',
        duration: 250,
      },
    });
  }
  document.getElementById('plot_sig_btn').disabled = true;
  document.getElementById('plot_data_btn').disabled = false;

}

function plotNewData() {
  x_val = (Math.random() * (5.0-0.0));
  z = b_0 + (b_1 * x_val);
  createCirlce('new_data' + new_data_num, x_val, sigmoid(z), 7, 'black', 1);

  var plotNewPoint = anime({
    targets: '#' + 'new_data' + new_data_num,
    r: {
      value: 1,
      easing: 'easeInOutSine',
      duration: 350,
    },
    direction: 'alternate'
  });
  document.getElementById('plot_data_btn').disabled = true;
  document.getElementById('classify_btn').disabled = false;
}

function classify() {
  var point_to_classify = document.getElementById('new_data' + new_data_num);
  if (sigmoid(z) >= .5) {
    var classifyNewPoint = anime({
      targets: '#' + 'new_data' + new_data_num,
      cy: {
        value: 5,
        easing: 'easeInOutSine',
        duration: 500,
      },
      r: {
        value: 5,
        easing: 'easeInOutSine',
        duration: 250,
        direction: 'alternate'
      }
    });
    point_to_classify.style.fill = 'purple';
  } else if (sigmoid(z) < .5) {
    var classifyNewPoint = anime({
      targets: '#' + 'new_data' + new_data_num,
      cy: {
        value: 400,
        easing: 'easeInOutSine',
        duration: 500,
      },
      r: {
        value: 5,
        easing: 'easeInOutSine',
        duration: 250,
        direction: 'alternate'
      }
    });
    point_to_classify.style.fill = 'green';
  }
  new_data_num++;
  document.getElementById('plot_data_btn').disabled = false;
  document.getElementById('classify_btn').disabled = true;
}
