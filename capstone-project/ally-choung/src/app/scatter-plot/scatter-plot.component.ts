import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { CountyData, METRICS, ScatterState } from '../data';
import { DataService } from '../data.service';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  providers: [DataService],
  styleUrls: ['./scatter-plot.component.scss', '../app.component.scss']
})
export class ScatterPlotComponent implements OnInit, AfterViewInit {
  svg: any = null;
  g: any = null;
  circle: any = null;
  xAxisGroup: any = null;
  yAxisGroup: any = null;
  dims = {
    height: 500,
    width: 800
  };

  state: ScatterState = {
    x: 'SAIPE_PCT_POV',
    y: 'AMFAR_MEDMHFAC_RATE',
    fips: [],
  };


  margins = {
    left: 100,
    right: 50,
    top: 50,
    bottom: 50
  };

  metrics = METRICS;

  countyData: CountyData[] = [];
  // countyData: any[] = this.dataService.countyData;

  xScale = d3.scaleLinear()
    .range([0, this.dims.width - this.margins.right - this.margins.left]); 
  
  yScale = d3.scaleLinear()
    .range([this.dims.height - this.margins.bottom - this.margins.top, 0]);

  constructor(private dataService: DataService) {
    this.dataService.countyData$.subscribe((data) => {
      if (data) {
        console.log('setting data');
        this.countyData = data;
        if (!this.circle) {
          this.setScales();
          this.updatePlot();
        }
      }
    });

    this.dataService.scatterState$.subscribe((state) => {
      if (state) {
        console.log('updating subscribe state');
        this.state = state;
        this.updatePlot();
      }
    })
  }
  
  ngOnInit(): void {
    if (!this.svg) {
      this.drawPlot();
    }

    // this.dataService.countyData.subscribe((data) => {
    //   if (data) {
    //     this.countyData = data;
    //   }
    //     // if (this.dataService.state) {
    //     //     this.filteredData = this.data.filter((d) => d.state_fips === this.dataService.state.code);
    //     // }
    // });
  }

  ngAfterViewInit(): void {
    // this.drawPlot();
    
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

  setScales(): void {
    if (this.countyData && this.countyData.length > 0) {
      this.xScale.domain(d3.extent(this.countyData, c => c.metrics.population[0].value) as number[]);
      this.yScale.domain(d3.extent(this.countyData, c => c.metrics.care[0].value) as number[]);
      // console.log(this.xScale.domain());
      // console.log(this.yScale.domain());
    }
    const xAxis = d3.axisBottom(this.xScale);

    const yAxis = d3.axisLeft(this.yScale);


    this.xAxisGroup = this.g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${this.yScale(this.yScale.range()[1])})`)
      .call(xAxis)  
    
    this.yAxisGroup = this.g.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(0, 0)`)
        .call(yAxis);

  }

  updatePlot(): void {
    this.circle = this.g.selectAll('circle')
      .data( this.countyData, (d: CountyData) => d.fipsCode )
      .join('circle')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('r', 2)
        .attr('cx', (c: CountyData) => {
          const metric = c.metrics.population.findIndex(p => p.code === this.state.x);
          return this.xScale(c.metrics.population[metric].value)
        })
        .attr('cy', (c: CountyData) => {
          const metric = c.metrics.care.findIndex(p => p.code === this.state.y);
          return this.yScale(c.metrics.care[metric].value)
        })
  }

  drawPlot(): void {
    this.svg = d3.select('div#scatter-plot')
      .append("svg")
      .attr("width", this.dims.width)
      .attr("height", this.dims.height)
      .attr("viewBox", [0, 0, this.dims.width, this.dims.height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // append a group element to the svg and offset it by the top and left margins
    this.g = this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margins.left + "," + this.margins.top + ")"
      );

    // this.setScales();
  }

  updateState(val: string, axis: string):void {
    let newState = this.state;
    if (axis === 'x') {
      newState = {...newState, x: val};
    } else if (axis === 'y') {
      newState = {...newState, y: val};
    }

    this.dataService.updateScatter(this.state);
  }
}
