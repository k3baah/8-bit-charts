import * as d3 from 'd3';

export const drawBarChart = (container, data) => {
  // Set dimensions and margins for the graph
  const margin = {top: 20, right: 30, bottom: 40, left: 90},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // Clear any existing content
  container.selectAll("*").remove();

  // Append the svg object to the container
  const svg = container
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // X axis
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .style("text-anchor", "end");

  // Y axis
  const y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(d => d.label))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", d => y(d.label))
    .attr("width", d => x(d.value))
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2")
}