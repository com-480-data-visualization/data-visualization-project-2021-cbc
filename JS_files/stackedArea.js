function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        // `DOMContentLoaded` already fired
        action();
    }
}
whenDocumentLoaded(() => {
    console.log('DOM loaded');
    plot_viz3(str_cont);

});

//Links to the different datasets corresponding to different visualizations
str_cont = "https://raw.githubusercontent.com/com-480-data-visualization/data-visualization-project-2021-cbc/master/Data/cardio_by_cont.csv"
str_gender = "https://raw.githubusercontent.com/com-480-data-visualization/data-visualization-project-2021-cbc/master/Data/cardio_by_gender.csv"
str_age = "https://raw.githubusercontent.com/com-480-data-visualization/data-visualization-project-2021-cbc/master/Data/cardio_by_age.csv"
str_cont_1000 = "https://raw.githubusercontent.com/com-480-data-visualization/data-visualization-project-2021-cbc/master/Data/cardio_by_cont_2.csv"
str_gender_1000 = "https://raw.githubusercontent.com/com-480-data-visualization/data-visualization-project-2021-cbc/master/Data/cardio_by_gender_2.csv"
str_age_1000 = "https://raw.githubusercontent.com/com-480-data-visualization/data-visualization-project-2021-cbc/master/Data/cardio_by_age_2.csv"

//Global variable
var by_1000 = false


//Function called when the category is switched or one of the two buttons is clicked
function chooseCategory(){
  var cat = document.getElementById("mySelect-viz3").value;
  if (cat=="age"&&!by_1000) {
    plot_viz3(str_age);
    svg.selectAll("*").remove();
  }else if (cat=="sex"&&!by_1000) {
    plot_viz3(str_gender);
    svg.selectAll("*").remove();
  }
  else if (cat=="continent"&&!by_1000){
    plot_viz3(str_cont);
    svg.selectAll("*").remove();
  } else if (cat=="age"&&by_1000) {
    plot_viz3(str_age_1000);
    svg.selectAll("*").remove();
  }else if (cat=="sex"&&by_1000) {
    plot_viz3(str_gender_1000);
    svg.selectAll("*").remove();
  }
  else if (cat=="continent"&&by_1000){
    plot_viz3(str_cont_1000);
    svg.selectAll("*").remove();
  }
}


//Updates the value of by_1000 and calls chooseCategory
function deaths(val){
  by_1000 = val
  chooseCategory()
}


var margin = {top: 40, right: 230, bottom: 50, left: 70},
    width = 660 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz_3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



//Makes our visualization
function plot_viz3(link){
d3.csv(link, function(data) {

  //////////
  // GENERAL //
  //////////

  // List of groups = header of the csv files
  var keys = data.columns.slice(1)
   console.log(keys)

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemePaired);

  //stack the data?
  var stackedData = d3.stack().keys(keys)(data)


  //////////
  // AXIS //
  //////////

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.Year; }))
    .range([ 0, width ]);
  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5))



  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+40 )
      .text("Time (year)");

  // Add Y axis label:
  var txt;
  if (by_1000){
    txt = "Number of deaths due to CVD for 1000 deaths in each category"
  } else{
    txt = "Number of deaths due to cardiovascular diseases"
  }
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", -60)
      .attr("y", -20 )
      .text(txt)
      .attr("text-anchor", "start")

  // Add Y axis
  var y;
  if(by_1000){
  y = d3.scaleLinear()
    .domain([0, 1200])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y).ticks(5))
  }else{
    y=d3.scaleLinear()
      .domain([0, 6000000])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
  }

  //////////
  // BRUSHING AND CHART //
  //////////

  // Add a clipPath: everything out of this area won't be drawn.
  var clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0)
      .attr("y", 0);

  // Add brushing
  var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

  // Create the scatter variable: where both the circles and the brush take place
  var areaChart = svg.append('g')
    .attr("clip-path", "url(#clip)")

  // Area generator
  var area = d3.area()
    .x(function(d) { return x(d.data.Year); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

  // Show the areas
  areaChart
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .attr("class", function(d) { return "myArea " + d.key })
      .style("fill", function(d) { return color(d.key); })
      .attr("d", area)

  //Add the brushing
  areaChart
    .append("g")
      .attr("class", "brush")
      .call(brush);

  var idleTimeout
  function idled() { idleTimeout = null; }

  // A function that update the chart for given boundaries
  function updateChart() {

    extent = d3.event.selection

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if(!extent){
      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
      x.domain(d3.extent(data, function(d) { return d.Year; }))
    }else{
      x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
      areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and area position
    xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
    areaChart
      .selectAll("path")
      .transition().duration(1000)
      .attr("d", area)
    }

    //////////
    // HIGHLIGHT GROUP //
    //////////

    // What to do when one group is hovered
    var highlight = function(d){
      console.log(d)
      // reduce opacity of all groups
      d3.selectAll(".myArea").style("opacity", .1)
      // expect the one that is hovered
      d3.select("."+d).style("opacity", 1)
    }

    // And when it is not hovered anymore
    var noHighlight = function(d){
      d3.selectAll(".myArea").style("opacity", 1)
    }

    //////////
    // LEGEND //
    //////////

    // Add one dot in the legend for each name.
    var size = 20
    svg.selectAll("myrect")
      .data(keys)
      .enter()
      .append("rect")
        .attr("x", 400)
        .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(keys)
      .enter()
      .append("text")
        .attr("x", 400 + size*1.2)
        .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

})}
