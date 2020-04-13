var svgWidth = 1000;
var svgHeight = 500;

// create an SVG element
var svg = d3.select("#svg-area")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Load csv data
d3.csv("data/Bigfoot.csv").then(function(lifeData) {

  console.log(lifeData);

  // cast the data from the csv as numbers
  lifeData.forEach(function(data) {
    data.year = +data.year;
    data.number = +data.number;
  });

  // Create a scale for your independent (x) coordinates
  var xScale = d3.scaleLinear()
    .domain(d3.extent(lifeData, d => d.year))
    .range([0, svgWidth]);

  // Create a scale for your dependent (y) coordinates
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(lifeData, d => d.number)])
    .range([svgHeight, 0]);

  // create a line generator function and store as a variable
  // use the scale functions for x and y data
  var createLine = d3.line()
    .x(data => xScale(data.year))
    .y(data => yScale(data.number));

  // Append a path element to the svg, make sure to set the stroke, stroke-width, and fill attributes.
  svg.append("path")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("fill", "none")
    .attr("d", createLine(lifeData));

})
// .catch(function(error) {
//   console.log(error);
// });
