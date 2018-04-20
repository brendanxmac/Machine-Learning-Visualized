
var numPoints = 30;
var points = [];
var purplePoints = [];
var greenPoints = [];
var new_point_classified = true;
var new_point_created = false;
var cur_num_of_points = 0;
var k_nearest_neighbors = [];
var classify_point = -1;
var purpleTally = 0;
var greenTally = 0;
var k = 3;

// green points
for (var i = 0; i < numPoints/2; i++) {
  points.push([Math.floor(Math.random() * (250 - 5)) + 100, Math.floor(Math.random() * 460) + 20]);
}
//purple points
for (var i = 0; i < numPoints/2; i++) {
  points.push([Math.floor(Math.random() * (600 - 370)) + 370, Math.floor(Math.random() * 460) + 20]);
}

var svgns = "http://www.w3.org/2000/svg";
var container = document.getElementById('graph');

// create a DOM for each data point
for (point in points) {
  var newPoint = document.createElementNS(svgns, 'circle');
  newPoint.setAttributeNS(null, 'id', point);
  newPoint.setAttributeNS(null, 'cx', points[point][0]);
  newPoint.setAttributeNS(null, 'cy', points[point][1]);
  newPoint.setAttributeNS(null, 'r', 5);
  if (newPoint.getAttribute('cx') >= 350) {
    newPoint.setAttributeNS(null, 'style', 'fill: purple; fill-opacity: 0.9;');
    newPoint.setAttributeNS(null, 'dataColor', 'purple');
  } else {
    newPoint.setAttributeNS(null, 'style', 'fill: green; fill-opacity: 0.9;');
    newPoint.setAttributeNS(null, 'dataColor', 'green');
  }
  graph.appendChild(newPoint);
}

// Add New Data Point
function addNewSample() {
  if (new_point_classified == false) {
    alert("Classify the new sample before you add another");
  } else {
    new_point_classified = false;
    new_point_created = true;
    points.push([Math.floor(Math.random() * 500) + 130, Math.floor(Math.random() * 460) + 20]);
    cur_num_of_points = points.length-1;
    console.log("Num of Points: " + cur_num_of_points);
    var newPoint = document.createElementNS(svgns, 'circle');
    newPoint.setAttributeNS(null, 'id', cur_num_of_points);
    newPoint.setAttributeNS(null, 'cx', points[cur_num_of_points][0]);
    newPoint.setAttributeNS(null, 'cy', points[cur_num_of_points][1]);
    newPoint.setAttributeNS(null, 'r',15);
    newPoint.setAttributeNS(null, 'style', 'fill: orange; fill-opacity: 1;');
    graph.appendChild(newPoint);
  }
}

function findNearestNeighbors() {
  k_nearest_neighbors = [];
  var nearest_point;
  var cur_nearest_distance_away = 1000;
  // find k nearest points
  for (var i = 0; i < k; i++) {
    for (point in points) {
      // NOT INSIDE NEAREST NEIGHBORS
      if (k_nearest_neighbors[0] != point && k_nearest_neighbors[1] != point && k_nearest_neighbors[2] != point && points[point] != points[cur_num_of_points]) {
        // CALCULATE DISTANCE AWAY
        var distanceAway = Math.sqrt( (Math.pow(points[cur_num_of_points][0]-points[point][0],2))
        + (Math.pow(points[cur_num_of_points][1]-points[point][1],2)));
        // IF CLOSER THAN PREVIOUS UPDATE THAT POINT TO NEAREST
        if (distanceAway < cur_nearest_distance_away) {
          nearest_point = point;
          cur_nearest_distance_away = distanceAway;
        }
      }
    }
  k_nearest_neighbors[i] = nearest_point;
  cur_nearest_distance_away = 1000;
  }
  purpleTally = 0;
  greenTally = 0;
  for (point in k_nearest_neighbors) {
    var close_neighbor = document.getElementById(k_nearest_neighbors[point]);
    close_neighbor.setAttributeNS(null, 'r', 15);
    if (close_neighbor.getAttribute('dataColor') == "purple") {
      purpleTally += 1;
    } else {
      greenTally += 1;
    }
  }
}

function classifySample() {
  if (new_point_created == false) {
    alert("You have to add a new point before you can classify it.")
  } else {
    classify_point = document.getElementById(cur_num_of_points);
    if (classify_point != -1) {
      if (purpleTally > greenTally) {
        classify_point.setAttributeNS(null, 'style', 'fill: purple; fill-opacity: .9;');
        classify_point.setAttributeNS(null, 'dataColor', 'purple');
        classify_point.setAttributeNS(null, 'r', 5);
      } else {
        classify_point.setAttributeNS(null, 'style', 'fill: green; fill-opacity: .9;');
        classify_point.setAttributeNS(null, 'dataColor', 'green');
        classify_point.setAttributeNS(null, 'r', 5);
      }
    }

    for (neighbor in k_nearest_neighbors) {
      var close_neighbor = document.getElementById(k_nearest_neighbors[neighbor]);
      close_neighbor.setAttributeNS(null, 'r', 5);
    }

    new_point_classified = true;
    new_point_created = false;
  }
}
