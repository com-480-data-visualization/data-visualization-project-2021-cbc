var chartReg = {};

function createChart(chartdiv, charttype) {
  // Check if the chart instance exists
  console.log("in createChart")
   maybeDisposeChart(chartdiv);
  // Create new chart
   chartReg[chartdiv] = am4core.create(chartdiv, charttype);
   return chartReg[chartdiv];
}

function maybeDisposeChart(chartdiv) {
  if (chartReg[chartdiv]) {
    chartReg[chartdiv].dispose();
    delete chartReg[chartdiv];
  }
}

function plot_viz1(input_data) {

// Themes begin
am4core.useTheme(am4themes_spiritedaway);
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.SankeyDiagram);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

// import the json into the plot's data
chart.data = input_data;

let hoverState = chart.links.template.states.create("hover");
hoverState.properties.fillOpacity = 0.6;


chart.dataFields.fromName = "from";
chart.dataFields.toName = "to";
chart.dataFields.value = "value";

chart.links.template.propertyFields.id = "category";
chart.links.template.propertyFields.prop = "prop";
chart.links.template.propertyFields.value = "value";
chart.links.template.colorMode = "gradient";
chart.links.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
chart.links.template.fillOpacity = 0.1;
chart.links.template.tooltipText = chart.links.template.propertyFields.value;
chart.links.template.showTooltipOn = "hit"


// highlight all links with the same id beginning
chart.links.template.events.on("over", function(event){
  let link = event.target;
  let ids = link.id.split(">");
  let id = ids[0];

  chart.links.each(function(y){
    if(y.id.indexOf(id) != -1){
      console.log("y.id: " + y.id)
      y.isHover = true;
    }
  })
})

chart.links.template.events.on("out", function(event){
  chart.links.each(function(link){
    link.isHover = false;
  })
})

chart.links.template.events.on("hit", function(event){
  let link = event.target;
  let ids = link.id.split(">");
  let id = ids[0];

  chart.links.each(function(y){
    if(y.id.indexOf(id) != -1){
      console.log("y.id: " + y.id)
      y.isHover = true;
      let val = y.value.toString().concat(", ")
      y.tooltipText = val.concat(y.prop)
    }
  })
})


// for right-most label to fit
chart.paddingRight = 30;


var nodeTemplate = chart.nodes.template;
nodeTemplate.nameLabel.adapter.add("locationX", function(location, target) {
  switch (target.parent.level) {
    case 2:
      return -3.5;
    default:
      return 1;
  }
});


nodeTemplate.inert = true;
nodeTemplate.readerTitle = "Drag me!";
nodeTemplate.showSystemTooltip = true;
nodeTemplate.width = 20;

nodeTemplate.nameLabel.label.width = 200;
nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
nodeTemplate.showSystemTooltip = true;
nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer

}

input_data = [
  {
    "from": "40-49",
    "to": "CVD",
    "category": "active >40-49>CVD",
    "value": 5928,
    "prop": "8.47%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "alcohol consumer>40-49>CVD",
    "value": 468,
    "prop": "0.67%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "female>40-49>CVD",
    "value": 4434,
    "prop": "6.33%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "high cholesterol>40-49>CVD",
    "value": 2235,
    "prop": "3.19%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "high glucose>40-49>CVD",
    "value": 1137,
    "prop": "1.62%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": " male>40-49>CVD",
    "value": 3014,
    "prop": "4.31%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "no alcohol>40-49>CVD",
    "value": 6980,
    "prop": "9.97%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "non smoker>40-49>CVD",
    "value": 6627,
    "prop": "9.47%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "normal cholesterol>40-49>CVD",
    "value": 5213,
    "prop": "7.45%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "normal glucose>40-49>CVD",
    "value": 6311,
    "prop": "9.02%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "notactive>40-49>CVD",
    "value": 1520,
    "prop": "2.17%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "not over weight>40-49>CVD",
    "value": 2379,
    "prop": "3.4%"
 },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "not under weight>40-49>CVD",
    "value": 7403,
    "prop": "10.5%"

  },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "overrweight>40-49>CVD",
    "value": 5069,
    "prop": "7.24%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "smoker >40-49>CVD",
    "value": 821,
    "prop": "1.17%"
    },
  {
    "from": "40-49",
    "to": "CVD",
    "category": "underweight>40-49>CVD",
    "value": 45,
    "prop": "0.06%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "active >40-49>no CVD",
    "value": 9981,
    "prop": "14.2%"

  },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "alcohol consumer>40-49>no CVD",
    "value": 738,
    "prop": "1.05%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "female>40-49>no CVD",
    "value": 7762,
    "prop": "11.0%"

  },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "high cholesterol>40-49>no CVD",
    "value": 1459,
    "prop": "2.08%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "high glucose>40-49>no CVD",
    "value": 1102,
    "prop": "1.57%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": " male>40-49>no CVD",
    "value": 4415,
    "prop": "6.31%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "no alcohol>40-49>no CVD",
    "value": 11439,
    "prop": "16.3%"

  },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "non smoker>40-49>no CVD",
    "value": 10888,
    "prop": "15.5%"

  },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "normal cholesterol>40-49>no CVD",
    "value": 10718,
    "prop": "15.3%"

  },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "normal glucose>40-49>no CVD",
    "value": 11075,
    "prop": "15.8%"

  },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "notactive>40-49>no CVD",
    "value": 2196,
    "prop": "3.14%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "not over weight>40-49>no CVD",
    "value": 6025,
    "prop": "8.61%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "not under weight>40-49>no CVD",
    "value": 11968,
    "prop": "17.1%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "overrweight>40-49>no CVD",
    "value": 6152,
    "prop": "8.79%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "smoker >40-49>no CVD",
    "value": 1289,
    "prop": "1.84%"
    },
  {
    "from": "40-49",
    "to": "no CVD",
    "category": "underweight>40-49>no CVD",
    "value": 209,
    "prop": "0.3%"
 },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "active >50-59>CVD",
    "value": 14489,
    "prop": "20.7%"
    },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "alcohol consumer>50-59>CVD",
    "value": 957,
    "prop": "1.37%"
    },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "female>50-59>CVD",
    "value": 12211,
    "prop": "17.4%"

  },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "high cholesterol>50-59>CVD",
    "value": 6261,
    "prop": "8.94%"
    },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "high glucose>50-59>CVD",
    "value": 3408,
    "prop": "4.87%"
    },
  {
    "from": "50-59",
    "to": "CVD",
    "category": " male>50-59>CVD",
    "value": 6144,
    "prop": "8.78%"
    },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "no alcohol>50-59>CVD",
    "value": 17398,
    "prop": "24.8%"

  },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "non smoker>50-59>CVD",
    "value": 16897,
    "prop": "24.1%"

  },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "normal cholesterol>50-59>CVD",
    "value": 12094,
    "prop": "17.2%"

  },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "normal glucose>50-59>CVD",
    "value": 14947,
    "prop": "21.3%"

  },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "notactive>50-59>CVD",
    "value": 3866,
    "prop": "5.52%"
    },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "not over weight>50-59>CVD",
    "value": 5424,
    "prop": "7.75%"
    },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "not under weight>50-59>CVD",
    "value": 18266,
    "prop": "26.0%"

  },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "overrweight>50-59>CVD",
    "value": 12931,
    "prop": "18.4%"

  },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "smoker >50-59>CVD",
    "value": 1458,
    "prop": "2.08%"
    },
  {
    "from": "50-59",
    "to": "CVD",
    "category": "underweight>50-59>CVD",
    "value": 89,
    "prop": "0.13%"
    },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "active >50-59>no CVD",
    "value": 14039,
    "prop": "20.0%"

  },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "alcohol consumer>50-59>no CVD",
    "value": 910,
    "prop": "1.3%"
 },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "female>50-59>no CVD",
    "value": 11637,
    "prop": "16.6%"

  },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "high cholesterol>50-59>no CVD",
    "value": 3141,
    "prop": "4.49%"
    },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "high glucose>50-59>no CVD",
    "value": 2208,
    "prop": "3.15%"
    },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": " male>50-59>no CVD",
    "value": 5549,
    "prop": "7.93%"
    },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "no alcohol>50-59>no CVD",
    "value": 16276,
    "prop": "23.2%"

  },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "non smoker>50-59>no CVD",
    "value": 15714,
    "prop": "22.4%"

  },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "normal cholesterol>50-59>no CVD",
    "value": 14045,
    "prop": "20.0%"

  },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "normal glucose>50-59>no CVD",
    "value": 14978,
    "prop": "21.4%"
    },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "notactive>50-59>no CVD",
    "value": 3147,
    "prop": "4.5%"
 },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "not over weight>50-59>no CVD",
    "value": 7423,
    "prop": "10.6%"
    },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "not under weight>50-59>no CVD",
    "value": 17011,
    "prop": "24.3%"
    },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "overrweight>50-59>no CVD",
    "value": 9763,
    "prop": "13.9%"

  },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "smoker >50-59>no CVD",
    "value": 1472,
    "prop": "2.1%"
 },
  {
    "from": "50-59",
    "to": "no CVD",
    "category": "underweight>50-59>no CVD",
    "value": 175,
    "prop": "0.25%"
    },
  {
    "from": "active",
    "to": "40-49",
    "category": "active >40-49>CVD",
    "value": 5928,
    "prop": "8.47%"
    },
  {
    "from": "active",
    "to": "40-49",
    "category": "active >40-49>no CVD",
    "value": 9981,
    "prop": "14.2%"

  },
  {
    "from": "active",
    "to": "50-59",
    "category": "active >50-59>CVD",
    "value": 14489,
    "prop": "20.7%"
    },
  {
    "from": "active",
    "to": "50-59",
    "category": "active >50-59>no CVD",
    "value": 14039,
    "prop": "20.0%"

  },
  {
    "from": "active",
    "to": "≤ 39",
    "category": "active >≤ 39>CVD",
    "value": 331,
    "prop": "0.47%"
    },
  {
    "from": "active",
    "to": "≤ 39",
    "category": "active >≤ 39>no CVD",
    "value": 1105,
    "prop": "1.58%"
    },
  {
    "from": "active",
    "to": "≥ 60",
    "category": "active >≥ 60>CVD",
    "value": 6870,
    "prop": "9.81%"
    },
  {
    "from": "active",
    "to": "≥ 60",
    "category": "active >≥ 60>no CVD",
    "value": 3518,
    "prop": "5.03%"
    },
  {
    "from": "alcohol consumer",
    "to": "40-49",
    "category": "alcohol consumer>40-49>CVD",
    "value": 468,
    "prop": "0.67%"
    },
  {
    "from": "alcohol consumer",
    "to": "40-49",
    "category": "alcohol consumer>40-49>no CVD",
    "value": 738,
    "prop": "1.05%"
    },
  {
    "from": "alcohol consumer",
    "to": "50-59",
    "category": "alcohol consumer>50-59>CVD",
    "value": 957,
    "prop": "1.37%"
    },
  {
    "from": "alcohol consumer",
    "to": "50-59",
    "category": "alcohol consumer>50-59>no CVD",
    "value": 910,
    "prop": "1.3%"
 },
  {
    "from": "alcohol consumer",
    "to": "≤ 39",
    "category": "alcohol consumer>≤ 39>CVD",
    "value": 27,
    "prop": "0.04%"
    },
  {
    "from": "alcohol consumer",
    "to": "≤ 39",
    "category": "alcohol consumer>≤ 39>no CVD",
    "value": 105,
    "prop": "0.15%"
    },
  {
    "from": "alcohol consumer",
    "to": "≥ 60",
    "category": "alcohol consumer>≥ 60>CVD",
    "value": 371,
    "prop": "0.53%"
    },
  {
    "from": "alcohol consumer",
    "to": "≥ 60",
    "category": "alcohol consumer>≥ 60>no CVD",
    "value": 188,
    "prop": "0.27%"
    },
  {
    "from": "female",
    "to": "40-49",
    "category": "female>40-49>CVD",
    "value": 4434,
    "prop": "6.33%"
    },
  {
    "from": "female",
    "to": "40-49",
    "category": "female>40-49>no CVD",
    "value": 7762,
    "prop": "11.0%"

  },
  {
    "from": "female",
    "to": "50-59",
    "category": "female>50-59>CVD",
    "value": 12211,
    "prop": "17.4%"

  },
  {
    "from": "female",
    "to": "50-59",
    "category": "female>50-59>no CVD",
    "value": 11637,
    "prop": "16.6%"

  },
  {
    "from": "female",
    "to": "≤ 39",
    "category": "female>≤ 39>CVD",
    "value": 255,
    "prop": "0.36%"
    },
  {
    "from": "female",
    "to": "≤ 39",
    "category": "female>≤ 39>no CVD",
    "value": 854,
    "prop": "1.22%"
    },
  {
    "from": "female",
    "to": "≥ 60",
    "category": "female>≥ 60>CVD",
    "value": 5716,
    "prop": "8.17%"
    },
  {
    "from": "female",
    "to": "≥ 60",
    "category": "female>≥ 60>no CVD",
    "value": 2661,
    "prop": "3.8%"
 },
  {
    "from": "high cholesterol",
    "to": "40-49",
    "category": "high cholesterol>40-49>CVD",
    "value": 2235,
    "prop": "3.19%"
    },
  {
    "from": "high cholesterol",
    "to": "40-49",
    "category": "high cholesterol>40-49>no CVD",
    "value": 1459,
    "prop": "2.08%"
    },
  {
    "from": "high cholesterol",
    "to": "50-59",
    "category": "high cholesterol>50-59>CVD",
    "value": 6261,
    "prop": "8.94%"
    },
  {
    "from": "high cholesterol",
    "to": "50-59",
    "category": "high cholesterol>50-59>no CVD",
    "value": 3141,
    "prop": "4.49%"
    },
  {
    "from": "high cholesterol",
    "to": "≤ 39",
    "category": "high cholesterol>≤ 39>CVD",
    "value": 132,
    "prop": "0.19%"
    },
  {
    "from": "high cholesterol",
    "to": "≤ 39",
    "category": "high cholesterol>≤ 39>no CVD",
    "value": 138,
    "prop": "0.2%"
 },
  {
    "from": "high cholesterol",
    "to": "≥ 60",
    "category": "high cholesterol>≥ 60>CVD",
    "value": 3296,
    "prop": "4.71%"
    },
  {
    "from": "high cholesterol",
    "to": "≥ 60",
    "category": "high cholesterol>≥ 60>no CVD",
    "value": 953,
    "prop": "1.36%"
    },
  {
    "from": "high glucose",
    "to": "40-49",
    "category": "high glucose>40-49>CVD",
    "value": 1137,
    "prop": "1.62%"
    },
  {
    "from": "high glucose",
    "to": "40-49",
    "category": "high glucose>40-49>no CVD",
    "value": 1102,
    "prop": "1.57%"
    },
  {
    "from": "high glucose",
    "to": "50-59",
    "category": "high glucose>50-59>CVD",
    "value": 3408,
    "prop": "4.87%"
    },
  {
    "from": "high glucose",
    "to": "50-59",
    "category": "high glucose>50-59>no CVD",
    "value": 2208,
    "prop": "3.15%"
    },
  {
    "from": "high glucose",
    "to": "≤ 39",
    "category": "high glucose>≤ 39>CVD",
    "value": 72,
    "prop": "0.1%"
 },
  {
    "from": "high glucose",
    "to": "≤ 39",
    "category": "high glucose>≤ 39>no CVD",
    "value": 104,
    "prop": "0.15%"
    },
  {
    "from": "high glucose",
    "to": "≥ 60",
    "category": "high glucose>≥ 60>CVD",
    "value": 1777,
    "prop": "2.54%"
    },
  {
    "from": "high glucose",
    "to": "≥ 60",
    "category": "high glucose>≥ 60>no CVD",
    "value": 713,
    "prop": "1.02%"
    },
  {
    "from": "male",
    "to": "40-49",
    "category": " male>40-49>CVD",
    "value": 3014,
    "prop": "4.31%"
    },
  {
    "from": "male",
    "to": "40-49",
    "category": " male>40-49>no CVD",
    "value": 4415,
    "prop": "6.31%"
    },
  {
    "from": "male",
    "to": "50-59",
    "category": " male>50-59>CVD",
    "value": 6144,
    "prop": "8.78%"
    },
  {
    "from": "male",
    "to": "50-59",
    "category": " male>50-59>no CVD",
    "value": 5549,
    "prop": "7.93%"
    },
  {
    "from": "male",
    "to": "≤ 39",
    "category": " male>≤ 39>CVD",
    "value": 177,
    "prop": "0.25%"
    },
  {
    "from": "male",
    "to": "≤ 39",
    "category": " male>≤ 39>no CVD",
    "value": 498,
    "prop": "0.71%"
    },
  {
    "from": "male",
    "to": "≥ 60",
    "category": " male>≥ 60>CVD",
    "value": 3028,
    "prop": "4.33%"
    },
  {
    "from": "male",
    "to": "≥ 60",
    "category": " male>≥ 60>no CVD",
    "value": 1645,
    "prop": "2.35%"
    },
  {
    "from": "no alcohol",
    "to": "40-49",
    "category": "no alcohol>40-49>CVD",
    "value": 6980,
    "prop": "9.97%"
    },
  {
    "from": "no alcohol",
    "to": "40-49",
    "category": "no alcohol>40-49>no CVD",
    "value": 11439,
    "prop": "16.3%"

  },
  {
    "from": "no alcohol",
    "to": "50-59",
    "category": "no alcohol>50-59>CVD",
    "value": 17398,
    "prop": "24.8%"

  },
  {
    "from": "no alcohol",
    "to": "50-59",
    "category": "no alcohol>50-59>no CVD",
    "value": 16276,
    "prop": "23.2%"

  },
  {
    "from": "no alcohol",
    "to": "≤ 39",
    "category": "no alcohol>≤ 39>CVD",
    "value": 405,
    "prop": "0.58%"
    },
  {
    "from": "no alcohol",
    "to": "≤ 39",
    "category": "no alcohol>≤ 39>no CVD",
    "value": 1247,
    "prop": "1.78%"
    },
  {
    "from": "no alcohol",
    "to": "≥ 60",
    "category": "no alcohol>≥ 60>CVD",
    "value": 8373,
    "prop": "11.9%"

  },
  {
    "from": "no alcohol",
    "to": "≥ 60",
    "category": "no alcohol>≥ 60>no CVD",
    "value": 4118,
    "prop": "5.88%"
    },
  {
    "from": "non smoker",
    "to": "40-49",
    "category": "non smoker>40-49>CVD",
    "value": 6627,
    "prop": "9.47%"
    },
  {
    "from": "non smoker",
    "to": "40-49",
    "category": "non smoker>40-49>no CVD",
    "value": 10888,
    "prop": "15.5%"

  },
  {
    "from": "non smoker",
    "to": "50-59",
    "category": "non smoker>50-59>CVD",
    "value": 16897,
    "prop": "24.1%"

  },
  {
    "from": "non smoker",
    "to": "50-59",
    "category": "non smoker>50-59>no CVD",
    "value": 15714,
    "prop": "22.4%"

  },
  {
    "from": "non smoker",
    "to": "≤ 39",
    "category": "non smoker>≤ 39>CVD",
    "value": 385,
    "prop": "0.55%"
    },
  {
    "from": "non smoker",
    "to": "≤ 39",
    "category": "non smoker>≤ 39>no CVD",
    "value": 1206,
    "prop": "1.72%"
    },
  {
    "from": "non smoker",
    "to": "≥ 60",
    "category": "non smoker>≥ 60>CVD",
    "value": 8141,
    "prop": "11.6%"

  },
  {
    "from": "non smoker",
    "to": "≥ 60",
    "category": "non smoker>≥ 60>no CVD",
    "value": 3973,
    "prop": "5.68%"
    },
  {
    "from": "normal cholesterol",
    "to": "40-49",
    "category": "normal cholesterol>40-49>CVD",
    "value": 5213,
    "prop": "7.45%"
    },
  {
    "from": "normal cholesterol",
    "to": "40-49",
    "category": "normal cholesterol>40-49>no CVD",
    "value": 10718,
    "prop": "15.3%"

  },
  {
    "from": "normal cholesterol",
    "to": "50-59",
    "category": "normal cholesterol>50-59>CVD",
    "value": 12094,
    "prop": "17.2%"

  },
  {
    "from": "normal cholesterol",
    "to": "50-59",
    "category": "normal cholesterol>50-59>no CVD",
    "value": 14045,
    "prop": "20.0%"

  },
  {
    "from": "normal cholesterol",
    "to": "≤ 39",
    "category": "normal cholesterol>≤ 39>CVD",
    "value": 300,
    "prop": "0.43%"
    },
  {
    "from": "normal cholesterol",
    "to": "≤ 39",
    "category": "normal cholesterol>≤ 39>no CVD",
    "value": 1214,
    "prop": "1.73%"
    },
  {
    "from": "normal cholesterol",
    "to": "≥ 60",
    "category": "normal cholesterol>≥ 60>CVD",
    "value": 5448,
    "prop": "7.78%"
    },
  {
    "from": "normal cholesterol",
    "to": "≥ 60",
    "category": "normal cholesterol>≥ 60>no CVD",
    "value": 3353,
    "prop": "4.79%"
    },
  {
    "from": "normal glucose",
    "to": "40-49",
    "category": "normal glucose>40-49>CVD",
    "value": 6311,
    "prop": "9.02%"
    },
  {
    "from": "normal glucose",
    "to": "40-49",
    "category": "normal glucose>40-49>no CVD",
    "value": 11075,
    "prop": "15.8%"

  },
  {
    "from": "normal glucose",
    "to": "50-59",
    "category": "normal glucose>50-59>CVD",
    "value": 14947,
    "prop": "21.3%"

  },
  {
    "from": "normal glucose",
    "to": "50-59",
    "category": "normal glucose>50-59>no CVD",
    "value": 14978,
    "prop": "21.4%"
    },
  {
    "from": "normal glucose",
    "to": "≤ 39",
    "category": "normal glucose>≤ 39>CVD",
    "value": 360,
    "prop": "0.51%"
    },
  {
    "from": "normal glucose",
    "to": "≤ 39",
    "category": "normal glucose>≤ 39>no CVD",
    "value": 1248,
    "prop": "1.78%"
    },
  {
    "from": "normal glucose",
    "to": "≥ 60",
    "category": "normal glucose>≥ 60>CVD",
    "value": 6967,
    "prop": "9.95%"
    },
  {
    "from": "normal glucose",
    "to": "≥ 60",
    "category": "normal glucose>≥ 60>no CVD",
    "value": 3593,
    "prop": "5.13%"
    },
  {
    "from": "not active",
    "to": "40-49",
    "category": "notactive>40-49>CVD",
    "value": 1520,
    "prop": "2.17%"
    },
  {
    "from": "not active",
    "to": "40-49",
    "category": "notactive>40-49>no CVD",
    "value": 2196,
    "prop": "3.14%"
    },
  {
    "from": "not active",
    "to": "50-59",
    "category": "notactive>50-59>CVD",
    "value": 3866,
    "prop": "5.52%"
    },
  {
    "from": "not active",
    "to": "50-59",
    "category": "notactive>50-59>no CVD",
    "value": 3147,
    "prop": "4.5%"
 },
  {
    "from": "not active",
    "to": "≤ 39",
    "category": "notactive>≤ 39>CVD",
    "value": 101,
    "prop": "0.14%"
    },
  {
    "from": "not active",
    "to": "≤ 39",
    "category": "notactive>≤ 39>no CVD",
    "value": 247,
    "prop": "0.35%"
    },
  {
    "from": "not active",
    "to": "≥ 60",
    "category": "notactive>≥ 60>CVD",
    "value": 1874,
    "prop": "2.68%"
    },
  {
    "from": "not active",
    "to": "≥ 60",
    "category": "notactive>≥ 60>no CVD",
    "value": 788,
    "prop": "1.13%"
    },
  {
    "from": "not over weight",
    "to": "40-49",
    "category": "not over weight>40-49>CVD",
    "value": 2379,
    "prop": "3.4%"
 },
  {
    "from": "not over weight",
    "to": "40-49",
    "category": "not over weight>40-49>no CVD",
    "value": 6025,
    "prop": "8.61%"
    },
  {
    "from": "not over weight",
    "to": "50-59",
    "category": "not over weight>50-59>CVD",
    "value": 5424,
    "prop": "7.75%"
    },
  {
    "from": "not over weight",
    "to": "50-59",
    "category": "not over weight>50-59>no CVD",
    "value": 7423,
    "prop": "10.6%"
    },
  {
    "from": "not over weight",
    "to": "≤ 39",
    "category": "not over weight>≤ 39>CVD",
    "value": 141,
    "prop": "0.2%"
 },
  {
    "from": "not over weight",
    "to": "≤ 39",
    "category": "not over weight>≤ 39>no CVD",
    "value": 716,
    "prop": "1.02%"
    },
  {
    "from": "not over weight",
    "to": "≥ 60",
    "category": "not over weight>≥ 60>CVD",
    "value": 2588,
    "prop": "3.7%"
 },
  {
    "from": "not over weight",
    "to": "≥ 60",
    "category": "not over weight>≥ 60>no CVD",
    "value": 1744,
    "prop": "2.49%"
    },
  {
    "from": "not under weight",
    "to": "40-49",
    "category": "not under weight>40-49>CVD",
    "value": 7403,
    "prop": "10.5%"

  },
  {
    "from": "not under weight",
    "to": "40-49",
    "category": "not under weight>40-49>no CVD",
    "value": 11968,
    "prop": "17.1%"
    },
  {
    "from": "not under weight",
    "to": "50-59",
    "category": "not under weight>50-59>CVD",
    "value": 18266,
    "prop": "26.0%"

  },
  {
    "from": "not under weight",
    "to": "50-59",
    "category": "not under weight>50-59>no CVD",
    "value": 17011,
    "prop": "24.3%"
    },
  {
    "from": "not under weight",
    "to": "≤ 39",
    "category": "not under weight>≤ 39>CVD",
    "value": 429,
    "prop": "0.61%"
    },
  {
    "from": "not under weight",
    "to": "≤ 39",
    "category": "not under weight>≤ 39>no CVD",
    "value": 1319,
    "prop": "1.88%"
    },
  {
    "from": "not under weight",
    "to": "≥ 60",
    "category": "not under weight>≥ 60>CVD",
    "value": 8699,
    "prop": "12.4%"

  },
  {
    "from": "not under weight",
    "to": "≥ 60",
    "category": "not under weight>≥ 60>no CVD",
    "value": 4255,
    "prop": "6.08%"
    },
  {
    "from": "over weight",
    "to": "40-49",
    "category": "overrweight>40-49>CVD",
    "value": 5069,
    "prop": "7.24%"
    },
  {
    "from": "over weight",
    "to": "40-49",
    "category": "overrweight>40-49>no CVD",
    "value": 6152,
    "prop": "8.79%"
    },
  {
    "from": "over weight",
    "to": "50-59",
    "category": "overrweight>50-59>CVD",
    "value": 12931,
    "prop": "18.4%"

  },
  {
    "from": "over weight",
    "to": "50-59",
    "category": "overrweight>50-59>no CVD",
    "value": 9763,
    "prop": "13.9%"

  },
  {
    "from": "over weight",
    "to": "≤ 39",
    "category": "overrweight>≤ 39>CVD",
    "value": 291,
    "prop": "0.42%"
    },
  {
    "from": "over weight",
    "to": "≤ 39",
    "category": "overrweight>≤ 39>no CVD",
    "value": 636,
    "prop": "0.91%"
    },
  {
    "from": "over weight",
    "to": "≥ 60",
    "category": "overrweight>≥ 60>CVD",
    "value": 6156,
    "prop": "8.79%"
    },
  {
    "from": "over weight",
    "to": "≥ 60",
    "category": "overrweight>≥ 60>no CVD",
    "value": 2562,
    "prop": "3.66%"
    },
  {
    "from": "smoker",
    "to": "40-49",
    "category": "smoker >40-49>CVD",
    "value": 821,
    "prop": "1.17%"
    },
  {
    "from": "smoker",
    "to": "40-49",
    "category": "smoker >40-49>no CVD",
    "value": 1289,
    "prop": "1.84%"
    },
  {
    "from": "smoker",
    "to": "50-59",
    "category": "smoker >50-59>CVD",
    "value": 1458,
    "prop": "2.08%"
    },
  {
    "from": "smoker",
    "to": "50-59",
    "category": "smoker >50-59>no CVD",
    "value": 1472,
    "prop": "2.1%"
 },
  {
    "from": "smoker",
    "to": "≤ 39",
    "category": "smoker >≤ 39>CVD",
    "value": 47,
    "prop": "0.07%"
    },
  {
    "from": "smoker",
    "to": "≤ 39",
    "category": "smoker >≤ 39>no CVD",
    "value": 146,
    "prop": "0.21%"
    },
  {
    "from": "smoker",
    "to": "≥ 60",
    "category": "smoker >≥ 60>CVD",
    "value": 603,
    "prop": "0.86%"
    },
  {
    "from": "smoker",
    "to": "≥ 60",
    "category": "smoker >≥ 60>no CVD",
    "value": 333,
    "prop": "0.48%"
    },
  {
    "from": "under weight",
    "to": "40-49",
    "category": "underweight>40-49>CVD",
    "value": 45,
    "prop": "0.06%"
    },
  {
    "from": "under weight",
    "to": "40-49",
    "category": "underweight>40-49>no CVD",
    "value": 209,
    "prop": "0.3%"
 },
  {
    "from": "under weight",
    "to": "50-59",
    "category": "underweight>50-59>CVD",
    "value": 89,
    "prop": "0.13%"
    },
  {
    "from": "under weight",
    "to": "50-59",
    "category": "underweight>50-59>no CVD",
    "value": 175,
    "prop": "0.25%"
    },
  {
    "from": "under weight",
    "to": "≤ 39",
    "category": "underweight>≤ 39>CVD",
    "value": 3,
    "prop": "0%"
  },
  {
    "from": "under weight",
    "to": "≤ 39",
    "category": "underweight>≤ 39>no CVD",
    "value": 33,
    "prop": "0.05%"
    },
  {
    "from": "under weight",
    "to": "≥ 60",
    "category": "underweight>≥ 60>CVD",
    "value": 45,
    "prop": "0.06%"
    },
  {
    "from": "under weight",
    "to": "≥ 60",
    "category": "underweight>≥ 60>no CVD",
    "value": 51,
    "prop": "0.07%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "active >≤ 39>CVD",
    "value": 331,
    "prop": "0.47%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "alcohol consumer>≤ 39>CVD",
    "value": 27,
    "prop": "0.04%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "female>≤ 39>CVD",
    "value": 255,
    "prop": "0.36%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "high cholesterol>≤ 39>CVD",
    "value": 132,
    "prop": "0.19%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "high glucose>≤ 39>CVD",
    "value": 72,
    "prop": "0.1%"
 },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": " male>≤ 39>CVD",
    "value": 177,
    "prop": "0.25%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "no alcohol>≤ 39>CVD",
    "value": 405,
    "prop": "0.58%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "non smoker>≤ 39>CVD",
    "value": 385,
    "prop": "0.55%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "normal cholesterol>≤ 39>CVD",
    "value": 300,
    "prop": "0.43%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "normal glucose>≤ 39>CVD",
    "value": 360,
    "prop": "0.51%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "notactive>≤ 39>CVD",
    "value": 101,
    "prop": "0.14%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "not over weight>≤ 39>CVD",
    "value": 141,
    "prop": "0.2%"
 },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "not under weight>≤ 39>CVD",
    "value": 429,
    "prop": "0.61%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "overrweight>≤ 39>CVD",
    "value": 291,
    "prop": "0.42%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "smoker >≤ 39>CVD",
    "value": 47,
    "prop": "0.07%"
    },
  {
    "from": "≤ 39",
    "to": "CVD",
    "category": "underweight>≤ 39>CVD",
    "value": 3,
    "prop": "0%"
  },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "active >≤ 39>no CVD",
    "value": 1105,
    "prop": "1.58%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "alcohol consumer>≤ 39>no CVD",
    "value": 105,
    "prop": "0.15%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "female>≤ 39>no CVD",
    "value": 854,
    "prop": "1.22%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "high cholesterol>≤ 39>no CVD",
    "value": 138,
    "prop": "0.2%"
 },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "high glucose>≤ 39>no CVD",
    "value": 104,
    "prop": "0.15%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": " male>≤ 39>no CVD",
    "value": 498,
    "prop": "0.71%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "no alcohol>≤ 39>no CVD",
    "value": 1247,
    "prop": "1.78%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "non smoker>≤ 39>no CVD",
    "value": 1206,
    "prop": "1.72%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "normal cholesterol>≤ 39>no CVD",
    "value": 1214,
    "prop": "1.73%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "normal glucose>≤ 39>no CVD",
    "value": 1248,
    "prop": "1.78%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "notactive>≤ 39>no CVD",
    "value": 247,
    "prop": "0.35%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "not over weight>≤ 39>no CVD",
    "value": 716,
    "prop": "1.02%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "not under weight>≤ 39>no CVD",
    "value": 1319,
    "prop": "1.88%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "overrweight>≤ 39>no CVD",
    "value": 636,
    "prop": "0.91%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "smoker >≤ 39>no CVD",
    "value": 146,
    "prop": "0.21%"
    },
  {
    "from": "≤ 39",
    "to": "no CVD",
    "category": "underweight>≤ 39>no CVD",
    "value": 33,
    "prop": "0.05%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "active >≥ 60>CVD",
    "value": 6870,
    "prop": "9.81%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "alcohol consumer>≥ 60>CVD",
    "value": 371,
    "prop": "0.53%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "female>≥ 60>CVD",
    "value": 5716,
    "prop": "8.17%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "high cholesterol>≥ 60>CVD",
    "value": 3296,
    "prop": "4.71%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "high glucose>≥ 60>CVD",
    "value": 1777,
    "prop": "2.54%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": " male>≥ 60>CVD",
    "value": 3028,
    "prop": "4.33%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "no alcohol>≥ 60>CVD",
    "value": 8373,
    "prop": "11.9%"

  },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "non smoker>≥ 60>CVD",
    "value": 8141,
    "prop": "11.6%"

  },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "normal cholesterol>≥ 60>CVD",
    "value": 5448,
    "prop": "7.78%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "normal glucose>≥ 60>CVD",
    "value": 6967,
    "prop": "9.95%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "notactive>≥ 60>CVD",
    "value": 1874,
    "prop": "2.68%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "not over weight>≥ 60>CVD",
    "value": 2588,
    "prop": "3.7%"
 },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "not under weight>≥ 60>CVD",
    "value": 8699,
    "prop": "12.4%"

  },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "overrweight>≥ 60>CVD",
    "value": 6156,
    "prop": "8.79%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "smoker >≥ 60>CVD",
    "value": 603,
    "prop": "0.86%"
    },
  {
    "from": "≥ 60",
    "to": "CVD",
    "category": "underweight>≥ 60>CVD",
    "value": 45,
    "prop": "0.06%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "active >≥ 60>no CVD",
    "value": 3518,
    "prop": "5.03%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "alcohol consumer>≥ 60>no CVD",
    "value": 188,
    "prop": "0.27%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "female>≥ 60>no CVD",
    "value": 2661,
    "prop": "3.8%"
 },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "high cholesterol>≥ 60>no CVD",
    "value": 953,
    "prop": "1.36%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "high glucose>≥ 60>no CVD",
    "value": 713,
    "prop": "1.02%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": " male>≥ 60>no CVD",
    "value": 1645,
    "prop": "2.35%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "no alcohol>≥ 60>no CVD",
    "value": 4118,
    "prop": "5.88%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "non smoker>≥ 60>no CVD",
    "value": 3973,
    "prop": "5.68%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "normal cholesterol>≥ 60>no CVD",
    "value": 3353,
    "prop": "4.79%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "normal glucose>≥ 60>no CVD",
    "value": 3593,
    "prop": "5.13%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "notactive>≥ 60>no CVD",
    "value": 788,
    "prop": "1.13%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "not over weight>≥ 60>no CVD",
    "value": 1744,
    "prop": "2.49%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "not under weight>≥ 60>no CVD",
    "value": 4255,
    "prop": "6.08%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "overrweight>≥ 60>no CVD",
    "value": 2562,
    "prop": "3.66%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "smoker >≥ 60>no CVD",
    "value": 333,
    "prop": "0.48%"
    },
  {
    "from": "≥ 60",
    "to": "no CVD",
    "category": "underweight>≥ 60>no CVD",
    "value": 51,
    "prop": "0.07%"
    }
];
plot_viz1(input_data)
