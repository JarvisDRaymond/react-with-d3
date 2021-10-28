import { useRef, useEffect } from "react";
import * as d3 from "d3";


function PieChart() {

/*
  Note: Both React and D3 want to control the DOM
  By using ref, this is possible
*/



const svgRefPie = useRef();
  // ensures DOM re-renders when data changes
  // so SVG code goes inside the useEffect
  
  

  useEffect(() => {
    let dataArr = [];
    fetch(
      'https://fakerapi.it/api/v1/products?_quantity=12&_taxes=1&_categories_type=uuid'
    ).then((response) => response.json())
    .then(response=>{
      response.data.forEach((obj, index) => {
        let itemName = obj.name;
        if (obj.net_price < 7500000) itemName = '';
        let tempObj = {name: itemName.slice(0,5), net_price:obj.net_price};
        dataArr.push(tempObj); 
      })
      console.log('Pie Data: ',dataArr)
    

    //setting up svg
    const w = 300;
    const h = 300;
    const radius = w/2;
    const svg = d3
      .select(svgRefPie.current)
      .attr("width", w)
      .attr("height", h)
      .style("margin-top", "220px")
      .style('margin-left', '300px')
      .style("overflow", "visible");
    // setting the chart

    // setting the data for the svg
    const formattedData = d3.pie().value(d => d.net_price)(dataArr);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius); 
    const color = d3.scaleOrdinal().range(d3.schemeSet2);
    // setting up SVG Data
    svg.selectAll()
      .data(formattedData)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', d=> color(d.value))
      .style('opacity',0.7);

    //setting up the annotation

    svg.append("text")
    .attr("x", 25)             
    .attr("y", -160)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-style", "italic")  
    .text("Random Data Shown in a Pie Chart");
    svg.selectAll()
      .data(formattedData)
      .join('text')
      .text(d=>d.data.name)
      .attr('transform', d=>`translate(${arcGenerator.centroid(d)})`)
      .style('text-anchor','middle')
      .style('font-size','8px')
    })
    
  });


  return (
    <div>
      <svg ref={svgRefPie}></svg>
    </div>
  );
}

export default PieChart;
