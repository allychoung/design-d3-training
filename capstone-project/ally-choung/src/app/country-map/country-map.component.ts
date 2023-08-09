import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ExtendedGeometryCollection } from 'd3';
import * as countiesGeoJson from '../data/counties-albers-10m.json';

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss', '../app.component.scss']
})
export class CountryMapComponent implements OnInit {
  svg: any;
  data: any[] | undefined;

  part1Dims = {
    height: 600,
    width: 900
  };

  part1Margins = {
    left: 50,
    right: 50,
    top: 50,
    bottom: 60
  }

  constructor() {
  }

  ngOnInit(): void {
    this.createSvg();
  }
  
  createSvg(): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log('loaded')
    }
    this.svg = d3.select('div#country-map')
      .append("svg")
      .attr("width", this.part1Dims.width)
      .attr("height", this.part1Dims.height)
      .attr("viewBox", [0, 0, this.part1Dims.width, this.part1Dims.height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    
    // append a group element to the svg and offset it by the top and left margins
    const g = this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.part1Margins.left + "," + this.part1Margins.top + ")"
      );

    // your code goes here

    const projection = d3.geoAlbersUsa().fitExtent([[0,0],
      [this.part1Dims.width - this.part1Margins.right - this.part1Margins.left, 
        this.part1Dims.height - this.part1Margins.bottom - this.part1Margins.top]],
        Object.entries(countiesGeoJson) as unknown as ExtendedGeometryCollection);

    const geoGenerator = d3.geoPath().projection(projection);


//     const NUM_PERCENTILES = 5;
//     const blueGreenScale = d3.scaleSequential()
//         .interpolator(d3.interpolateBlues)
//         .domain([0, NUM_PERCENTILES]); // for quintiles

//     const colorScale = d3.scaleQuantile()
//         .domain(d3.sort(countyData20.map(c => +c.MMD_DEPR_DISD




// )))
//     .range([...Array(NUM_PERCENTILES).keys()].map(n => blueGreenScale(n)));

//     const mapping = countiesGeoJson.features.map(c => {
//       const res = countyData20.filter(depr => c.id == depr.COUNTYFIPS);
//       return {...c, depr: res.length > 0 ? +res[0].MMD_DEPR_DISD




//     : undefined }
//     });

    g.selectChildren('path')
        .data(countiesGeoJson as unknown as ExtendedGeometryCollection)
        // .data(mapping)
        .join('path')
        .attr('fill', 'green')
        // .attr('fill', (c: ) => {
        //   let d = c.depr;
        //   return d ? colorScale(d) : 'gray';
        // })
        .attr('stroke', 'gray')
        .attr('stroke-width', .3)      
        .attr('d', geoGenerator)

//     const legend = this.svg.append('g')
//       .attr('transform', `translate(${100}, ${this.part1Dims.height - this.part1Margins.bottom - 50})`);

//     legend.append('rect')
//       .attr('x', 0)
//       .attr('y', 0)
//       .attr('width', 400)
//       .attr('height', 50)
//       .attr('stroke', 'black')
//       .attr('fill', 'none');

//     legend.append('text')
//       .attr("font-size", 10)
//       .attr("x", 3)
//       .attr("y", 12)
//       .text("Unemployment Rate (%)")


//     const tiles = d3.sort([...d3.extent(colorScale.domain()), ...colorScale.quantiles()]);
//     const keyItem = legend.selectChildren('g') 
//       .data(tiles) // should have numpercentiles + 1
//       .join('g')
//       .attr('transform', (_, i: number) => `translate(${70 * i + 10}, 0)`)

//     keyItem.append('rect')
//       .attr('x', 10)
//       .attr('y', 25)
//       .attr('width', 20)
//       .attr('height', 20)
//       .attr('stroke', 'black')
//       .attr('fill', (c, i: number) => i >= NUM_PERCENTILES ? 'gray' : colorScale(c));

//     keyItem.append('text')
//       .attr('x', 0)
//       .attr('y', 22)
//       .attr("font-size", 10)
//       .text((t, i) => i < NUM_PERCENTILES ? t + ' - ' + tiles[i + 1] : 'No data')



  } 

  private drawMap(data: []): void {

  }
  
}
