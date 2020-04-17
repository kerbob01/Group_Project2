// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 35, left: 60 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")
  ;
var myimage = svg.append('image')
  .attr('xlink:href', 'https://www.outsideonline.com/sites/default/files/styles/width_1200/public/2016/07/08/bigfoot-rick-jacobs-6.jpg?itok=-R6SVg09')
  .attr('width', '112%')
  .attr('height', '100%')
  .attr('opacity', '90%')
//.attr("width", width + margin.left + margin.right +30)
//.attr("height", height + margin.top + margin.bottom -45)

myimage.attr('x', -95)



//Read the data
d3.csv("../data/sightings_by_year.csv",

  // When reading the csv, I must format variables:
  function (d) {
    return { year: d3.timeParse("%Y")(d.year), count: +d.count }
  },

 

  // Now I can use this dataset:
  function (data) {

    //var yyyy = year.getFullYear();
    

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.year; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      //.style('fill', 'white')
      .selectAll("text")
      .style("fill", "white");


    // Add Y axis
    // var y = d3.scaleLinear()
    //   .domain( [-5, 260])
    //   .range([ height, 0 ]);
    // svg.append("g")
    //   .call(d3.axisLeft(y));

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return +d.count; })])
      .range([height, 0]);
    yAxis = svg.append("g")
      .call(d3.axisLeft(y))
      ;

    // gridlines in x axis function
    function make_x_gridlines() {
      return d3.axisBottom(x)
        .ticks(10)
    }

    // gridlines in y axis function
    function make_y_gridlines() {
      return d3.axisLeft(y)
        .ticks(10)

    }


    //mycolor = d3.rgb(128,128,128);//grey
    // mycolor = d3.hsl('grey');  //  Hue-Saturation-Lightness  (e.g. red)
    //d3.select("#my_dataviz").style("background-color", mycolor) 

    //svg.style("background","url('https://www.outsideonline.com/sites/default/files/styles/width_1200/public/2016/07/08/bigfoot-rick-jacobs-6.jpg?itok=-R6SVg09') no-repeat");



    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        //.curve(d3.curveBasis) // Just add that to have a curve instead of segments
        .x(function (d) { return x(d.year) })
        .y(function (d) { return y(d.count) })
      )

    // create a tooltip
    var Tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
    }
    var mousemove = function (d) {
      Tooltip
        .html("Number of Sightings: " + d.count)
        .html("Year of Sighting: " + d.year + "<br> Number of Sightings: " + d.count)
        .style("left", (d3.mouse(this)[0] + 40) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function (d) {
      Tooltip
        .style("opacity", 0)
    }

    // Add the points
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "myCircle")
      .attr("cx", function (d) { return x(d.year) })
      .attr("cy", function (d) { return y(d.count) })
      .attr("r", 5)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("fill", "black")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    //add x lable
    svg.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Year of Sighting")
      .style('fill', 'white')

      ;
    //add y lable
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Counts Per Year")
      ;
    //-------------------------------------------------------------------------------------------------------------
    // add the X gridlines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat("")
      )
      .selectAll("grid")
      .style("fill", "white");

    // add the Y gridlines
    svg.append("g")
      .attr("class", "grid")

      .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
        //.style("stroke", "white")
        //.attr("stroke-width", 2)
      )





  })