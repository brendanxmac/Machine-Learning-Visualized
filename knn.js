
var numPoints = 600;
var points = [];
for (var i = 0; i < numPoints; i++) {
  points.push([Math.floor(Math.random() * 500) + 130, Math.floor(Math.random() * 460) + 20]);
}


var svgns = "http://www.w3.org/2000/svg";
var container = document.getElementById('graph');
