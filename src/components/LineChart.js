import { useRef, useEffect } from "react";
import * as d3 from "d3";


function LineChart() {

/*
  Note: Both React and D3 want to control the DOM
  By using ref, this is possible
*/


const svgRefLine = useRef();

//const [data] = useState([25, 50, 35, 15, 94, 10]);

useEffect(() => {

  let dataArr = [];
  fetch(
    'https://data.cityofnewyork.us/resource/tg4x-b46p.json'
  ).then((response) => response.json())
  .then(data=>{
    data.forEach((obj, index) => {
      
      dataArr.push(parseInt(obj['policeprecinct_s'])); 
    }) 
    console.log('Line Chart Data: ',dataArr)



  //setting up svg
  const w = 500;
  const h = 120;
  const svg = d3
    .select(svgRefLine.current)
    .attr("width", w)
    .attr("height", h)
    .style("margin-top", "80px")
    .style("overflow", "visible");
  // setting the scaling
  const xScale = d3
    .scaleLinear()
    .domain([0, dataArr.length - 1])
    .range([0, w]);
  const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);
  const generateScaledLine = d3
    .line()
    .x((d, i) => xScale(i))
    .y(yScale)
    .curve(d3.curveCardinal);
  // setting the axes of the chart
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickFormat((i) => i );
  const yAxis = d3.axisLeft(yScale).ticks(5);
  svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
  svg.append("g").call(yAxis);
  svg.append("text")
  .attr("x", 250)             
  .attr("y", -25)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("text-style", "italic")  
  .text("NYC Police Precinct Numbers From Some API");
  // setting the data for the svg
  svg
    .selectAll(".line")
    .data([dataArr])
    .join("path")
    .attr("d", (d) => generateScaledLine(d))
    .attr("fill", "none")
    .attr("stroke", "black");
  })
});


  return (
    <div>
      <svg ref={svgRefLine}></svg>
    </div>
  );
}

export default LineChart;
