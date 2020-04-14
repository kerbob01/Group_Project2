// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 20, left: 50 },
  width = 1500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("counts_by_season_state_piviot.csv", function (data) {

  var keys = ["Fall", "Spring", "Summer", "Unknown", "Winter"]

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)
  console.log(subgroups)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function (d) { return (d.State) }).keys()
  console.log(groups)
  // Add X axis
  var x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    ;

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 550])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e"])
  //["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]
  //["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]


  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)
  console.log(stackedData)

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
    .attr("fill", function (d) { return color(d.key); })
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(function (d) { return d; })
    .enter().append("rect")
    .attr("x", function (d) { return x(d.data.State); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
  //set up for animation
    //.attr("height", function (d) { return height - y(0); }) // always equal to 0
    .attr("y", function (d) { return y(d[1]); })


//animation to load bar chart
  // svg.selectAll("rect")
  //   .transition()
  //   .duration(2000)
  //   .attr("y", function (d) { return y(d.stackedData); })
  //   .attr("height", function (d) { return height - y(stackedData); })
  //   .delay(function (d, i) { console.log(i); return (i * 100) })

//Ledgend layout
  // Add one dot in the legend for each name.
  var size = 15
  svg.selectAll("mydots")
    .data(keys)
    .enter()
    .append("rect")
    .attr("x", 25)
    .attr("y", function (d, i) { return 25 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function (d) { return color(d) })

  // Add one dot in the legend for each name.
  svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 25 + size * 1.2)
    .attr("y", function (d, i) { return 25 + i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function (d) { return color(d) })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

})