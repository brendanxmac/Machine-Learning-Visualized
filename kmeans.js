// https://stackoverflow.com/questions/16488884/add-svg-element-to-existing-svg-using-dom
var numPoints = 2000;
var points = [];
for (var i = 0; i < numPoints; i++) {
  points.push([Math.floor(Math.random() * 500) + 130, Math.floor(Math.random() * 460) + 20]);
}

document.getElementById('updateBtn').disabled = true;

var svgns = "http://www.w3.org/2000/svg";
var container = document.getElementById('graph');

// create a DOM for each dataPoint
for (point in points) {
  var newPoint = document.createElementNS(svgns, 'circle');
  newPoint.setAttributeNS(null, 'id', point);
  newPoint.setAttributeNS(null, 'cx', points[point][0]);
  newPoint.setAttributeNS(null, 'cy', points[point][1]);
  newPoint.setAttributeNS(null, 'r', 4);
  newPoint.setAttributeNS(null, 'style', 'fill: black; fill-opacity: 0.3;');
  graph.appendChild(newPoint);
}

var clusters = [
  [Math.floor(Math.random() * 500) + 130 ,Math.floor(Math.random() * 460) + 20],
  [Math.floor(Math.random() * 500) + 130 ,Math.floor(Math.random() * 460) + 20],
  [Math.floor(Math.random() * 500) + 130 ,Math.floor(Math.random() * 460) + 20]];

//Create clusterPoints
var clusterRed = document.createElementNS(svgns, 'circle');
var clusterBlue = document.createElementNS(svgns, 'circle');
var clusterGreen = document.createElementNS(svgns, 'circle');

var colors = ['red', 'blue', 'green'];
var clusterColor = [];
clusterColor.push(clusterRed, clusterBlue, clusterGreen);

//Give clusters Details
for (cluster in clusterColor) {
  clusterColor[cluster].setAttributeNS(null, 'id', colors[cluster]);
  clusterColor[cluster].setAttributeNS(null, 'cx', clusters[cluster][0] );
  clusterColor[cluster].setAttributeNS(null, 'cy', clusters[cluster][1]);
  clusterColor[cluster].setAttributeNS(null, 'r', 22);
  clusterColor[cluster].setAttributeNS(null, 'style', 'fill: ' + colors[cluster] + '; fill-opacity: 0.8;');
  graph.appendChild(clusterColor[cluster])
}

var allClusters = [];
var redCluster = [];
var blueCluster = [];
var greenCluster = [];
allClusters.push([redCluster],[blueCluster],[greenCluster]);


function dataAssignment(points, allClusters, redCluster, blueCluster, greenCluster) {
  document.getElementById('assignmentBtn').disabled = true;
  document.getElementById('updateBtn').disabled = false;
  //CLEAR OUT ALL OLD DATA
  for (cluster in allClusters) {
    if (allClusters[cluster][0].length > 1) {
      var len = allClusters[cluster][0].length;
      allClusters[cluster][0].splice(0,len);
    }
  }

  for (point in points) {
    // Euclidean Distance to red group
    var redDistance = Math.sqrt( (Math.pow(clusterRed.getAttribute('cx')-points[point][0],2))
    + (Math.pow(clusterRed.getAttribute('cy')-points[point][1],2)));
    // Euclidean Distance to blue group
    var blueDistance = Math.sqrt( (Math.pow(clusterBlue.getAttribute('cx')-points[point][0],2))
    + (Math.pow(clusterBlue.getAttribute('cy')-points[point][1],2)));
    // Euclidean Distance to green group
    var greenDistance = Math.sqrt( (Math.pow(clusterGreen.getAttribute('cx')-points[point][0],2))
    + (Math.pow(clusterGreen.getAttribute('cy')-points[point][1],2)));

    if (redDistance < blueDistance && redDistance < greenDistance) {
      document.getElementById(point).style.fill='red';
      redCluster.push([points[point][0], points[point][1]]);
    }
    else if (blueDistance < redDistance && blueDistance < greenDistance) {
      document.getElementById(point).style.fill='blue';
      blueCluster.push([points[point][0], points[point][1]]);
    }
    else if (greenDistance < blueDistance && greenDistance < redDistance) {
      document.getElementById(point).style.fill='green';
      greenCluster.push([points[point][0], points[point][1]]);
    }
  }

  for (cluster in allClusters) {
    if (allClusters[cluster][0].length > 1) {
      document.getElementById(colors[cluster] + "Value").innerHTML = allClusters[cluster][0].length + " ( " + (allClusters[cluster][0].length/numPoints).toFixed(2) + "% )" + "&emsp;&emsp;";
    }
  }
}

function updateCentroid(clusters, clusterColor, allClusters, colors) {
  document.getElementById('assignmentBtn').disabled = false;
  document.getElementById('updateBtn').disabled = true;
  for (cluster in clusters) {
    var clusterX = 0;
    var clusterY = 0;
    var clusterPoints = 0;
    var clusterXMean;
    var clusterYMean;
    for (point in allClusters[cluster][0]) {
      clusterX += allClusters[cluster][0][point][0];
      clusterY += allClusters[cluster][0][point][1];
      clusterPoints +=1;
    }
    clusterXMean = clusterX / clusterPoints;
    clusterYMean = clusterY / clusterPoints;

    var moveCluster = anime({
      targets: '#' + colors[cluster],
      cx: {
        value: clusterXMean,
        duration: 500
      },
      cy: {
        value: clusterYMean,
        duration: 500
      }
    });
    clusters[cluster][0] = clusterXMean;
    clusters[cluster][1] = clusterYMean;
  }
}
