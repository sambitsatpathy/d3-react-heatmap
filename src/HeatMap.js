import React from 'react';
import {hexbin} from 'd3-hexbin';

const heatMap=()=> {
  const margin = {
    top: 50,
    right: 20,
    bottom: 20,
    left: 50
  },
  width = 850,
  height = 350;

  //The number of columns and rows of the heatmap
  const MapColumns = 30,
  MapRows = 20;

  //The maximum radius the hexagons can have to still fit the screen
  const hexRadius = Math.min(width/((MapColumns + 0.5) * Math.sqrt(3)),height/((MapRows + 1/3) * 1.5)),
  colorScale =["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"];
  var points = [];
  for (var i = 0; i < MapRows; i++) {
      for (var j = 0; j < MapColumns; j++) {
          points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
      }
  }

  const hexbinPath = hexbin().radius(hexRadius);
  return (
      <svg width={width+margin.left+margin.right} height={height + margin.top + margin.bottom+100}>
        <g transform={"translate(" + margin.left + "," + margin.top + ")"}>
        {hexbinPath(points).map((d,i)=><path shapeRendering="geometricPrecision" key={i} transform={"translate(" + d.x + "," + d.y + ")"} d={hexbinPath.hexagon()} style={{fill:colorScale[Math.floor(Math.random() * colorScale.length-1) + 1]}}/>)}
        </g>
        <g>
          <linearGradient id="linearGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          {colorScale.map((d,i)=><stop key={i} offset={i/(colorScale.length-1)} stopColor={d}/>)}
          </linearGradient>
          <text x={margin.left+100} y={height+margin.top + margin.bottom-10} style={{fontSize:14}}>Legend</text>
          <rect style={{fill:'url(#linearGradient)'}} x={margin.left+100} y={height+margin.top + margin.bottom} width={(width-40)/2}height="10" />
        </g>
      </svg>
  );
}

export default heatMap;
