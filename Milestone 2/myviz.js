var width = 1400,
  height = 500,
  centered,
  startYear = 1988,
  endYear = 2019,
  chosenYear = 2000;
var country_code = d3.map()

// The svg
var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)

// Map and projection
var path = d3.geoPath();
var projection = d3.geoNaturalEarth()
  .scale(width / 2.5 / Math.PI)
  .translate([width / 2, height / 2 +30])
var path = d3.geoPath()
  .projection(projection);

// Data and color scale
var data = d3.map();
var colorScheme = d3.schemeYlOrRd[9];
colorScheme.unshift("#eee")
var colorScale = d3.scaleThreshold()
  .domain([3000, 6000, 9000, 12000, 15000, 20000, 25000, 30000, 35000])
  .range(colorScheme);

// Legend
var g = svg.append("g")
  .attr("class", "legendThreshold")
  .attr("transform", "translate(180,30)");

g.append("text")
  .attr("class", "caption")
  .attr("x", 0)
  .attr("y", -15)
  .text("Number of deaths from CVD over 100'000 deaths");



var labels = ['no data', '1-3000', '3000-6000', '6000-9000', '9000-12000', '12000-15000', '15000-20000', '20000-25000', '25000-30000', '>30000'];
var legend = d3.legendColor()
  .labels(function (d) { return labels[d.i]; })
  .shapePadding(4)
  .scale(colorScale);

// tooltip countries NOT WORKING
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([70, 0])
  .html(function (d) {
    let country = d.properties.name;
    let percentage = d.total / 1000;
    percentage = (percentage > 0) ? percentage + "%" : "no data"
    return "<strong>Country: </strong>" + country + " <br> <strong>Percentage of CVD deaths: </strong> <span>" + percentage;
  })
svg.call(tip);



svg.select(".legendThreshold")
  .call(legend);


// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/com-480-data-visualization/data-visualization-project-2021-cbc/master/Data/proba_by_country_and_year.csv")
  .await(ready);

function ready(error, topo, data1, date = chosenYear) {
  //console.log(topo.features);
  data.empty();
  for(var i=0;i<177;i++){
//  console.log(topo.features[i].id==data1[6].code);
}
//console.log(data1[6].code);

for(var i=0;i<177;i++){
  data.set(topo.features[i].id,0);
}
  data1.forEach(function (d) {
    if (d.Year == chosenYear) {
      //data.set(topo.features.id)
      data.set(d.code, d.norm)
    }
  });

  //initialise la map
  datayear = update(data, date);

  let mouseOver = function (d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function (d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", 0.9)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  };

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    // draw each country
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    // set color of each country
    .attr("fill", function (d) {
      //console.log(d);
      d.total =   data.get(d.id) || 0;
      //console.log(d.total);
      return colorScale(d.total);
    })
    .style("stroke", "transparent")
    .attr("class", function (d) { return "Country" })
    .style("opacity", 1)
    .on("mouseover", mouseOver)
    .on("mouseover", tip.show)
    .on("mouseleave", mouseLeave)
    .on("mouseleave", tip.hide);


  slider.oninput = function () {
    output.innerHTML = this.value;
    //console.log(this.value)
    chosenYear = this.value
    d3.queue()
      .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .defer(d3.csv, "https://raw.githubusercontent.com/com-480-data-visualization/data-visualization-project-2021-cbc/master/Data/proba_by_country_and_year.csv")
      .await(ready);
  }

}

/*function clicked(d) {
    var x, y, k;

    if (d && centered !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      centered = d;
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
}

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
    .duration(750)
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
    .style("stroke-width", 1.5 / k + "px");
}*/

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)

function update(full_data, year) {
  //console.log(full_data);
  var newData = Object.values(full_data).filter(full_data => full_data.Year == year);
  //console.log(newData);
  return newData;
}
