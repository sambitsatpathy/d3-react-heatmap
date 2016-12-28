import React from 'react';
import {hexbin} from 'd3-hexbin';
import * as d3 from 'd3';

const heatMap=({data})=> {
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  },
  width = 850,
  height = 350;

  const hexData = d3.nest()
                .key(function(d) {
                  return d.key;
                })
                .entries(data),
  MapColumns = hexData.reduce(function(a,b){
                      if(a.values.length > b.values.length){
                        return a;
                      }else{
                        return b;
                      }
                    }).values.length,
  MapRows = hexData.length,
  hexRadius = d3.min([width/((MapColumns + 0.5) * Math.sqrt(3)),height/((MapRows + 1/3) * 1.5)]),
  colours=["#5490c1", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"],
  colorScale = d3.scaleLinear()
                .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
                .range(colours),
  dataToColorMap = d3.scaleLinear().domain([0,60]).range([0,1]);

  var points = [];
  for (var i = 0; i < MapRows; i++) {
      for (var j = 0; j < MapColumns; j++) {
          points.push([hexRadius * j * 1.75, hexRadius * i * 1.5,hexData[i].values[j].value]);
      }
  }
  const hexbinPath = hexbin().radius(hexRadius);
  return (
      <svg width={width+margin.left+margin.right} height={height + margin.top + margin.bottom+100}>
        <g transform={"translate(10," + margin.top + ")"}>
        {hexData.map((d,i)=><text key={i} x='0' y={i + hexRadius * i * 1.5}>{d.key}</text>)}
        </g>
        <g transform={"translate(90," + margin.top + ")"}>
        {hexbinPath(points).map((d,i)=><g className="hexPath" key={i} >
          <path shapeRendering="geometricPrecision" transform={"translate(" + d.x + "," + d.y + ")"} d={hexbinPath.hexagon()} style={{fill:colorScale(dataToColorMap(d[0][2]))}}/>
          <text transform={"translate(" + (d.x-7) + "," + (d.y+5) + ")"} >{d[0][2]}</text>
          </g>
        )}
        </g>
        <g>
          <linearGradient id="linearGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          {colours.map((d,i)=><stop key={i} offset={i/(colours.length-1)} stopColor={d}/>)}
          </linearGradient>
          <text x={margin.left+200} y={height-margin.bottom -50} style={{fontSize:14}}>Minutes worked in an hour</text>
          <rect style={{fill:'url(#linearGradient)'}} x={margin.left+200} y={height- margin.bottom -40} width={(width-40)/2} height="10" />
        </g>
      </svg>
  );
}

export default heatMap;
