// chart dimensions
var svgWidth = 960;
var svgHeight = 660;

let chartMargin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60,
};

let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// create svg
let svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight + chartMargin.top + chartMargin.bottom)
  .attr("width", svgWidth + chartMargin.left + chartMargin.right)
  .append("g")
  .attr(
    "transform",
    "translate(" + chartMargin.left + "," + chartMargin.top + ")"
  );

// creating the scatterplot
d3.csv("assets/data/data.csv").then((myData) => {
  myData.map((data) => {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log(data);
  });

  // scale for x axis
  let x = d3
    .scaleLinear()
    .domain([
      d3.min(myData, (item) => item.poverty) - 1,
      d3.max(myData, (item) => item.poverty),
    ])
    .range([0, chartWidth]);

  // scale for y axis
  let y = d3
    .scaleLinear()
    .domain([
      d3.min(myData, (item) => item.healthcare) - 1,
      d3.max(myData, (item) => item.healthcare),
    ])
    .range([chartHeight, 0]);

  // adding x axis and labels
  svg
    .append("g")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(d3.axisBottom(x));
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + chartWidth / 2 + " ," + (chartHeight + chartMargin.top + 20) + ")"
    )
    .style("text-anchor", "middle")
    .text("In Poverty (%)");

  // adding y axis and labels
  svg.append("g").call(d3.axisLeft(y));
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left)
    .attr("x", 0 - chartHeight / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Lacks Healthcare (%)");

  // adding data to scatter
  svg
    .append("g")
    .selectAll("dot")
    .data(myData)
    .enter()
    .append("circle")
    .attr("cx", function (item) {
      return x(item.poverty);
    })
    .attr("cy", function (item) {
      return y(item.healthcare);
    })
    .attr("r", 13)
    .style("fill", "#89bdd3");
  svg
    .append("g")
    .selectAll("dot")
    .data(myData)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .text(function (item) {
      return item.abbr;
    })
    .attr("x", function (item) {
      return x(item.poverty);
    })
    .attr("y", function (item) {
      return y(item.healthcare) + 5;
    });
});
