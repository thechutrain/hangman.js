google.charts.load('upcoming', {'packages':['geochart']});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {

  var data = google.visualization.arrayToDataTable([
    ["Country"],
    ["United States"],
    // ['Country', 'Popularity'],
    // ['Germany', 200],
    // ['United States', 300],
    // ['Brazil', 400],
    // ['Canada', 500],
    // ['France', 600],
    // ['RU', 700]
  ]);

  var options = {enableRegionInteractivity: false};

  var chart = new google.visualization.GeoChart(document.querySelector('#worldMap'));

  chart.draw(data, options);
}

