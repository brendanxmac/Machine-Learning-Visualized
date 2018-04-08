// https://stackoverflow.com/questions/16488884/add-svg-element-to-existing-svg-using-dom
var points = [];
for (var i = 0; i < 5000; i++) {
  points.push([Math.floor(Math.random() * 500) + 130, Math.floor(Math.random() * 460) + 20]);

}

// Example Data Set Creation 2D array
// var points = [
//   [140, 400],[160, 420],[190, 450],[170, 453],[220, 320],[180, 290],[140, 440],
//   [160, 300],[180, 340],[190, 380],[320, 159],[350, 99],[370, 106],[370, 200],
//   [350, 200],[290, 167],[255, 135],[270, 180],[359, 167],[375, 59],[531, 290],
//   [501, 320],[491, 422],[477, 378],[404, 357],[420, 440],[455, 400],[545, 350],
//   [501, 390],[515, 280]];

var svgns = "http://www.w3.org/2000/svg";
var container = document.getElementById('graph');

// create a DOM for each dataPoint
for (point in points) {
  var newPoint = document.createElementNS(svgns, 'circle');
  newPoint.setAttributeNS(null, 'id', point);
  newPoint.setAttributeNS(null, 'cx', points[point][0]);
  newPoint.setAttributeNS(null, 'cy', points[point][1]);
  newPoint.setAttributeNS(null, 'r', 4);
  newPoint.setAttributeNS(null, 'style', 'fill: black; stroke-width: 2px; fill-opacity: 0.3;');
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
  clusterColor[cluster].setAttributeNS(null, 'style', 'fill: ' + colors[cluster] + '; stroke-width: 3px; fill-opacity: 0.8;');
  graph.appendChild(clusterColor[cluster])
}

var allClusters = [];
var redCluster = [];
var blueCluster = [];
var greenCluster = [];
allClusters.push([redCluster],[blueCluster],[greenCluster]);


function dataAssignment(points, allClusters, redCluster, blueCluster, greenCluster) {

  //CLEAR OUT ALL OLD DATA
  for (cluster in allClusters) {
    if (allClusters[cluster][0].length > 1) {
      console.log(allClusters[cluster][0].length);
      var len = allClusters[cluster][0].length;
      allClusters[cluster][0].splice(0,len);
      // console.log(allClusters[cluster].length);
    }
  }
  console.log("===========================");
  console.log("===========================");

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
      // console.log("RED");
      // console.log(redCluster);
    }
    else if (blueDistance < redDistance && blueDistance < greenDistance) {
      document.getElementById(point).style.fill='blue';
      blueCluster.push([points[point][0], points[point][1]]);
      // console.log("BLUE");
      // console.log(blueCluster);
    }
    else if (greenDistance < blueDistance && greenDistance < redDistance) {
      document.getElementById(point).style.fill='green';
      greenCluster.push([points[point][0], points[point][1]]);
      // console.log("GREEN");
      // console.log(greenCluster);
    }
  }
}



function updateCentroid(clusters, clusterColor, allClusters, colors) {
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
        duration: 500,
      },
      cy: {
        value: clusterYMean,
        duration: 500,
      },
    });

    clusters[cluster][0] = clusterXMean;
    clusters[cluster][1] = clusterYMean;

    // clusterColor[cluster].setAttributeNS(null, 'cx', clusterXMean);
    // clusterColor[cluster].setAttributeNS(null, 'cy', clusterYMean);
  }
}
