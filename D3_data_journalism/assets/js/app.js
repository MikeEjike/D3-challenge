var svgWidth = 960;
var svgHeight = 660;

var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30,
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

dataFile = "assets/data/data.csv";
d3.csv(dataFile).then((data) => {
  console.log(data.poverty);
  
// scale for y axis
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (item) => item.hours)])
    .range([chartHeight, 0]);
// scale for x axis
  let xScale = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, chartWidth])
    // .paddingInner(0.1)
    // .paddingOuter(0.2); //talk about xScale.step
    .padding(0.2);
// x and y axis
  let bottomAxis = d3.axisBottom(xScale);
  let leftAxis = d3.axisLeft(yScale).ticks(10);

// adding data to scatter
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (item) {
      return xScale(item.healthcare);
    })
    .attr("cy", function (item) {
      return yScale(item.poverty);
    })
    .attr("r", 1.5)
    .style("fill", "#69b3a2");
});
