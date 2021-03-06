// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("sightings by_season.csv", function(data) {

  // sort data
  data.sort(function(b, a) {
    return a.count - b.count;
  });

  // X axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.season; }))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return +d.count; })])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

    console.log()

  // Bars
  // svg.selectAll("mybar")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //     .attr("x", function(d) { return x(d.season); })
  //     .attr("y", function(d) { return y(d.count); })
  //     .attr("width", x.bandwidth())
  //     .attr("height", function(d) { return height - y(d.count); })
  //     .attr("fill", "#69b3a2")
  
      svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.season); })
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2")
        // no bar at the beginning thus:
        .attr("height", function(d) { return height - y(0); }) // always equal to 0
        .attr("y", function(d) { return y(0); })

  svg.selectAll("rect")
      .transition()
      .duration(2000)
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); })
      .delay(function(d,i){console.log(i) ; return(i*100)})
    
    })
    



