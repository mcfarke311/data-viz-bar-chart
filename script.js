// define the height and width of the chart
const h = window.innerHeight;
const w = window.innerWidth;
const margin = ({top: 20, right: 50, bottom: 20, left: 50});

// get the data
let req = new XMLHttpRequest();
req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", false);
req.send();
const jso = JSON.parse(req.response);

// get the starting and ending date
const minDate = new Date(jso.from_date);
const maxDate = new Date(jso.to_date);

console.log(minDate);
console.log(maxDate);

// calculate bar width
const barWidth = d3.scaleBand()
    .domain(d3.range(jso.data.length))
    .range([margin.left, w - margin.right])
    .bandwidth()

// create the scale factor on the y axis
const yScale = d3.scaleLinear()
    .domain([0, d3.max(jso.data.map(d => d[1]))])
    .range([h - margin.bottom, margin.top]);

// create the scale factor on the x axis
const xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([0, w - margin.left - margin.right])

// create the svg with the set height/width
const svg = d3.select("body").append("svg")
    .attr("height", h)
    .attr("width", w);

// create the y axis
const yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + margin.left + ", 0)")
    .call(yAxis);

// create the x axis
const xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeYear.every(5));

svg.append("g")
    .attr("id", "x-axis")
    .call(xAxis)
    .attr("transform", "translate(" + margin.left + ", " + (h - margin.bottom) +")");

// visualize the data
d3.select("svg").selectAll("rect")
    .data(jso.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("height", (d) => h - yScale(d[1]) - margin.top)
    .attr("width", barWidth)
    .attr("x", (d, i) => (margin.left + (barWidth * i)))
    .attr("y", (d) => yScale(d[1]))
    .attr("fill", "black");