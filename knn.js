
var numPoints = 10;
var points = [];
var purplePoints = [];
var greenPoints = [];
var new_point_classified = true;
var new_point_created = false;
var cur_num_of_points = 0;
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
    newPoint.setAttributeNS(null, 'r',12);
    newPoint.setAttributeNS(null, 'style', 'fill: orange; fill-opacity: .9;');
    graph.appendChild(newPoint);
  }
}

function classifySample() {
  var k_nearest_neighbors = [];
  var nearest_point;
  var cur_nearest_distance_away = 1000;
  if (new_point_created == false) {
    alert("You have to add a new point before you can classify it.")
  } else {
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
    // console.log(nearest_point);
    // console.log(k_nearest_neighbors);
    }
    var purpleTally = 0;
    var greenTally = 0;
    for (point in k_nearest_neighbors) {
      console.log(k_nearest_neighbors[point]);
      console.log(document.getElementById(k_nearest_neighbors[point]).getAttribute('dataColor'));
      if (document.getElementById(k_nearest_neighbors[point]).getAttribute('dataColor') == "purple") {
        purpleTally += 1;
      } else {
        greenTally += 1;
      }
    }

    console.log("Purple: " + purpleTally);
    console.log("Green: " + greenTally);

    var classify_point = document.getElementById(cur_num_of_points);

     if (purpleTally > greenTally) {
       classify_point.setAttributeNS(null, 'style', 'fill: purple; fill-opacity: .9;');
       classify_point.setAttributeNS(null, 'dataColor', 'purple');
     } else {
       classify_point.setAttributeNS(null, 'style', 'fill: green; fill-opacity: .9;');
       classify_point.setAttributeNS(null, 'dataColor', 'green');
     }
    new_point_classified = true;
    new_point_created = false;
  }
}
