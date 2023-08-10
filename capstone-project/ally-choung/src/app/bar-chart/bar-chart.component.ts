import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { CountyData, CountyDataItem, SortQuery } from '../data';
import { DataService } from '../data.service';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss', '../app.component.scss'],
  providers: [DataService]
})
export class BarChartComponent implements OnInit {
  svg:any = null;
  g:any = null;

  xGroup:any = null;
  yGroup:any = null;
  dims = {
      width: 500,
      height: 500
  }
  part2Margins = {
      left: 100,
      right: 50,
      top: 50,
      bottom: 50
  }

  yScale = d3.scaleBand()
    .range([0, this.dims.height - (this.part2Margins.top + this.part2Margins.bottom)])

  yAxis = d3.axisLeft(this.yScale)

  xScale = d3.scaleLinear()
    .range([0, (this.dims.width - (this.part2Margins.left + this.part2Margins.right))])

  colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateViridis)
    .domain([0, 4]);
  countyData: CountyData[] = [];
  sortData: CountyData[] = [];
  selectionData: CountyData[] = [];

  filteredStates: string[] = [];
  sortsState: SortQuery = {
    stateFips: [],
    countyFips: []
  };
  // sortsState$ = new BehaviorSubject<any>(null);
  
  constructor(public dataService: DataService) {
  }
  ngOnInit(): void {
    // this.sortsState$.next(this.sortsState);
    // this.sortsState$.subscribe((state) => {
    //   console.log('sub')
    // })
    if (!this.svg) {
      this.drawSvg();
    }
    this.dataService.countyData$.subscribe((data) => {
      if (data) {
        this.countyData = data;
        this.sortData = data;
        this.setScales();
        this.drawGroups();
      }
    })
  }

  setScales(): void {
    if (this.countyData.length == 0 ) {
      return;
    }
    if (this.sortsState.countyFips.length == 0) {
      this.yScale.domain([...Array(5).keys()].map((i: number) => {
        return this.countyData[i].countyName  
      }))  
    } else {
      this.yScale.domain(this.selectionData.map((c: CountyData) => {
          return c.countyName  
        }))  

    }
    // console.log(this.yScale.domain());

  // const yForAxis = d3.scaleLinear()
  //   .domain([0, d3.max(airQualityData, c => c.Emissions) + 1000])
  //   .range([(part2Dims.height - (part2Margins.top + part2Margins.bottom)), 0]);

    this.xScale.domain([0, d3.max(this.countyData, 
      c => d3.max(c.metrics.disorder, d => d.value)) as number])
      
    if (!this.xGroup) {
      this.xGroup = this.g.append("g")
      // .attr("transform", `translate(0,${7 * climateData.length})`)
      .call(d3.axisTop(this.xScale))
      .attr("transform", `translate(0, ${0})`);
    }

    if (!this.yGroup) {
      this.yGroup = this.g.append("g")
      .call(this.yAxis)
    }

    this.yGroup.transition()
    .duration(20)
      .call(this.yAxis)
      .selectAll(".tick")
      .delay((_:any, i: number) => i * 20);



  }

  drawGroups(): void {
    if (this.selectionData.length == 0) {
      return;
    }
    const group = this.g.selectChildren('g.bars')
      .data(this.selectionData)
      // .data(this.selectionData, (d: CountyData) => d.countyName)
      .join(
        (enter: any) => enter.append('g')
          .attr('class', 'bars')
          .attr('transform', (c: CountyData, i: number) => `translate(0, ${this.yScale(c.countyName)})`),
        (update: any) => update.transition().duration(1000)
          .attr('transform', (c: CountyData, i: number) => `translate(0, ${this.yScale(c.countyName)})`)
          .selection(),
        (exit: any) => exit,


      )

    group.selectChildren('rect')
      .data((c: CountyData) => this.selectionData.find(s => s.fipsCode === c.fipsCode)?.metrics.disorder, 
        (d: CountyData) => d.fipsCode)
      .join(
        (enter: any) => enter.append('rect')
          .attr("fill", (d: CountyDataItem, i: number) => this.colorScale(i))
          .attr("width", (d: CountyDataItem) => this.xScale(d.value))
          .attr("height", 10)
          .attr("transform", (c: CountyDataItem, i: number) => `translate(0, ${i * 11})`),
        (update: any) => update,
        (exit: any) => exit,  
      )
  }
  drawSvg(): void {
    this.svg = d3.select('div#bar-chart')
      .append("svg")
      .attr("width", this.dims.width)
      .attr("height", this.dims.height)
      .attr("viewBox", [0, 0, this.dims.width, this.dims.height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // append a group element to the svg and offset it by the top and left margins
    this.g = this.svg
      .append("g")
      .attr("transform", "translate(" + this.part2Margins.left + "," + this.part2Margins.top + ")");
    
  }

  stateClicked(val: string): void {
    this.sortsState.stateFips.push(val);
    this.sortData = this.countyData.filter(c => this.sortsState.stateFips.find(s => s === c.state));
    console.log(this.sortData)
  }

  countyClicked(val: string): void {
    this.sortsState.countyFips.push(val);
    this.selectionData = this.countyData.filter(c => this.sortsState.countyFips.find(s => s === c.fipsCode));
    this.setScales();
    this.drawGroups();
    console.log(this.sortsState.countyFips);
  }

}
