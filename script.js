// define the height and width of the chart
const h = 768;
const w = 1024;
const padding = 50;

// get the data
let req = new XMLHttpRequest();
req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", false);
req.send();
const workingData = JSON.parse(req.response).data;
const yValues = workingData.map(d => d[1])

// calculate bar width
const barWidth = ((w - padding) / workingData.length);

// create the scale factor on the y axis
const yScale = d3.scaleLinear()
    .domain([d3.min(yValues), d3.max(yValues)])
    .range([0, (h - padding)]);

// create the svg with the set height/width
d3.select("body").append("svg")
    .attr("height", h)
    .attr("width", w);

// visualize the data
d3.select("svg").selectAll("rect")
    .data(workingData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .property("data-date", (d) => d[0])
    .property("data-gdp", (d) => d[1])
    .attr("height", (d) => yScale(d[1]))
    .attr("width", barWidth)
    .attr("x", (d, i) => (padding + (barWidth * i)))
    .attr("y", (d) => (h - padding - yScale(d[1])))
    .attr("fill", "black");