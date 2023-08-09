import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { CountyData, METRICS } from '../data';
import { DataService } from '../data.service';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  providers: [DataService],
  styleUrls: ['./scatter-plot.component.scss', '../app.component.scss']
})
export class ScatterPlotComponent implements OnInit {
  svg: any;

  dims = {
    height: 500,
    width: 960
  };

  margins = {
    left: 100,
    right: 50,
    top: 50,
    bottom: 50
  };

  metrics = METRICS;

  countyData: CountyData[] = [];

  constructor(private dataService: DataService) {
  }
  
  ngOnInit(): void {
    this.dataService.countyData.subscribe((data) => {
      if (data) {
        this.countyData = data;
      }
        // if (this.dataService.state) {
        //     this.filteredData = this.data.filter((d) => d.state_fips === this.dataService.state.code);
        // }
    });
  }

  ngAfterViewInit(): void {
    this.svg = d3.select('div#scatter-plot')
      .append("svg")
      .attr("width", this.dims.width)
      .attr("height", this.dims.height)
      .attr("viewBox", [0, 0, this.dims.width, this.dims.height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // append a group element to the svg and offset it by the top and left margins
    const g = this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margins.left + "," + this.margins.top + ")"
      );

    // // your code goes here
    // const xScale = d3.scaleTime()
    //   .domain([d3.min(this.countyData, p => p.metrics.care[0].value),
    //           d3.max(this.countyData, p => new Date(p.year))])
    //   .range([0, this.dims.width - this.margins.right - this.margins.left]); 


    // const yScale = d3.scaleLinear()
    //   .domain([d3.max(this.countyData, p => parseFloat(p.pop) / 1000000),
    //           0])
    //   .range([0, this.dims.height - this.margins.bottom - this.margins.top]);

    
    // // sort population data by country 
    // const dateSorter = (a, b) => new Date(a).getFullYear() > new Date(b).getFullYear() ? 1 : -1; 
    // const countries = [...new Set(this.countyData.map(p => p.country))];
    // const sortedData = countries.map(c => d3.sort(this.countyData.filter(p => p.country === c), dateSorter));


    // // color scheme
    // const getCountryColor = (r) => d3.schemeCategory10[(countries.indexOf(r))];

    // // axes 
    // const xAxis = d3.axisBottom(xScale);

    // const yAxis = d3.axisLeft(yScale);

    // // draw the lines

    // const line = d3.line()
    //   .x(d => xScale(new Date(d.year)))
    //   .y(d => yScale(parseFloat(d.pop) / 1000000))
    //   .curve(d3.curveNatural)


    // g.selectAll('path')
    //   .data( sortedData )
    //   .join('path')
    //     .attr('d', line)
    //     .style('stroke', c => getCountryColor(c[0].country))
    //     .style('stroke-width', 2)
    //     .style('fill', 'transparent');

    // g.append('g')
    //     .attr('class', 'x-axis')
    //     .attr('transform', `translate(0, ${yScale(0)})`)
    //   .call(xAxis)
    
    // g.append('g')
    //     .attr('class', 'y-axis')
    //     .attr('transform', `translate(0, 0)`)
    //   .call(yAxis);


    // const legend = g.append('g')
    //   .attr('transform', `translate(${this.dims.width - this.margins.left - this.margins.right - 150}, 
    //                                 ${this.dims.height - this.margins.top - this.margins.bottom - 150})`);


    // legend.selectAll('rect')
    //   .data(countries)
    //   .join('rect')
    //     .attr('fill', c => getCountryColor(c))
    //     .attr('width', 15)
    //     .attr('height', 15)
    //     .attr('x', 0)
    //     .attr('y', (c, i) => 20 * i);


    // legend.selectChildren('text')
    //   .data(countries)
    //   .join('text')
    //     .attr("font-family", "sans-serif")
    //     .attr("font-size", 12)
    //     .attr('x', 20)
    //     .attr('y', (c, i) => 13 + 20 * i)
    //     .text(c => c);


    // this.svg.append("text")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 24)
    //   .attr("x", this.margins.left)
    //   .attr("y", this.margins.top / 2)
    //   .text("Country Populations from 1960-2016")

    // g.append("text")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 12)
    //   .attr("transform", `translate(${(this.dims.width - this.margins.left - this.margins.right) /2}, ${yScale(0) + 30})`)
    //   .text("Year")

    // g.append("text")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 12)
    //   .attr("text-anchor", "middle")
    //   .attr("transform", `translate(${-1 * this.margins.left + 10}, ${this.dims.height / 2 - 50}) rotate(270)`)
    //   .text("Population (in millions)")
  }

}
