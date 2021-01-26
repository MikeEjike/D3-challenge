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

dataFile = "assets/data/data.csv";
d3.csv(dataFile).then((myData) => {
  myData.map((data) => {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log(data.abbr);
    // console.log(d3.max(myData, (item) => item.healthcare));
  });
  console.log(d3.max(myData, (item) => item.healthcare));

  // scale for x axis
  let x = d3
    .scaleLinear()
    .domain([d3.min(myData, (item) => item.poverty)-1, d3.max(myData, (item) => item.poverty)]) //data.map((item) => item.poverty)])
    .range([0, chartWidth]);


  // scale for y axis
  let y = d3
    .scaleLinear()
    .domain([d3.min(myData, (item) => item.healthcare)-1, d3.max(myData, (item) => item.healthcare)])
    .range([chartHeight, 0]);
  svg.append("g").call(d3.axisLeft(y));

  svg
    .append("g")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(d3.axisBottom(x));

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
    .attr("r", 10)
    .style("fill", "#69b3a2")
    .append("text").text(function(item){
      return item.abbr;
    })
    .attr("x", function (item) {
      return x(item.poverty);
    })
    .attr("y", function (item) {
      return y(item.healthcare);
    });
});
