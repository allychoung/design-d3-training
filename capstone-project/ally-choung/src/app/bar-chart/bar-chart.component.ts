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
  legend: any =null;
  keyItem: any;
  xGroup:any = null;
  yGroup:any = null;
  dims = {
      width: 500,
      height: 500
  }

  BAR_HEIGHT = 10;
  DISORDER_COUNT = 4;
  part2Margins = {
      left: 100,
      right: 50,
      top: 50,
      bottom: 50
  };

  sortsState: SortQuery = {
    stateFips: new Set(),
    countyFips: new Set(),
  }

  yScale = d3.scaleBand()
    .range([0, this.dims.height - (this.part2Margins.top + this.part2Margins.bottom)])

  xScale = d3.scaleLinear()
    .range([0, (this.dims.width - (this.part2Margins.left + this.part2Margins.right))])

  colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateViridis)
    .domain([0, 4]);
  countyData: CountyData[] = [];
  sortData: CountyData[] = [];
  selectionData: CountyData[] = [];

  filteredStates: string[] = [];
  yAxis = () => d3.axisLeft(this.yScale)
  // .tickValues(this.selectionData.map((c: CountyData) => c.countyName));

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    if (!this.svg) {
      this.drawSvg();
    }
    this.dataService.countyData$.subscribe((data) => {
      if (data) {
        this.countyData = data;
        this.sortData = data;
        this.setScales();
        this.drawGroups();
        this.makeLegend();
      }
    });

    this.dataService.sortsState$.subscribe((state) => {
      if (state) {
        this.sortsState = state;
        this.selectionData = this.countyData.filter(c => this.sortsState.countyFips.has(c.fipsCode));
        this.sortData = this.countyData.filter(c => this.sortsState.stateFips.has(c.state));

      };
    });
  }

  setScales(): void {
    if (this.countyData.length == 0 ) {
      return;
    }
    // if (this.sortsState.countyFips.length == 0) {
    //   this.yScale.domain([...Array(5).keys()].map((i: number) => {
    //     return this.countyData[i].countyName  
    //   }))  
    if (this.sortsState.countyFips.size > 0) {
      this.yScale.domain(this.selectionData.map((c: CountyData) => {
          return c.fipsCode  
      }))
        .range([0, this.selectionData.length * (this.DISORDER_COUNT + 1) * this.BAR_HEIGHT])

    }

    this.xScale.domain([0, d3.max(this.countyData, 
      c => d3.max(c.metrics.disorder, d => d.value)) as number])
      
    if (!this.xGroup) {
      this.xGroup = this.g.append("g")
      // .attr("transform", `translate(0,${7 * climateData.length})`)
      .call(d3.axisTop(this.xScale))
      // .attr("transform", (c: )`translate(0, ${this.yScale(this.)})`);
      this.g.append("text")
        .attr("transform", `translate(0,0)`)
        .text('Percentage of county population')
        .attr('font-size',10)
        .attr("transform", 'translate(90,-25)');

    }

    if (!this.yGroup) {
      this.yGroup = this.g.append("g")
      .call(this.yAxis())
    }

    this.yGroup.transition()
      .duration(500)
      .call(this.yAxis())
      .selectAll(".tick")
      .delay((_:any, i: number) => i * 20);

    // this.yGroup.selectAll('.tick').text((c: string) => this.getCountyNameByFips(c));


  }

  drawGroups(): void {
    if (this.selectionData.length == 0) {
      return;
    }


    const group = this.g.selectChildren('g.bar')
      .data(this.selectionData, (d: CountyData) => d.fipsCode)
      // .data(this.selectionData, (d: CountyData) => d.countyName)
      .join(
        (enter: any) => enter.append('g')
          .attr('class', 'bar')
          .attr('transform', (c: CountyData, i: number) => `translate(0, ${this.yScale(c.fipsCode)})`)
          .selection(),
        (update: any) => update.transition().duration(500)
          .attr('transform', (c: CountyData, i: number) => `translate(0, ${this.yScale(c.fipsCode)})`)
          .selection(),
        (exit: any) => exit
          .attr('transform', (c: CountyData, i: number) => `translate(0, ${this.yScale(c.fipsCode)})`)
          .selection(),
      )

    // group.selectChildren('text')
    // .data((c: CountyData) => this.selectionData.find(s => s.fipsCode === c.fipsCode)?.metrics.disorder, 
    //   (d: CountyData) => d.fipsCode)
    // .join(
    //   (enter: any) => enter.append('text')
    //     .text((d: CountyDataItem, i: number) => d.)
    //     .attr("transform", (c: CountyDataItem, i: number) => `translate(-40, ${i * 11})`),
    //   (update: any) => update,
    //   (exit: any) => exit,  
    // )


    group.selectChildren('rect')
      .data((c: CountyData) => this.selectionData.find(s => s.fipsCode === c.fipsCode)?.metrics.disorder, 
        (d: CountyData) => d.fipsCode)
      .join(
        (enter: any) => enter.append('rect')
          .attr("fill", (d: CountyDataItem, i: number) => this.colorScale(i))
          .attr("height", this.BAR_HEIGHT)
          .attr("width", (d: CountyDataItem) => this.xScale(d.value))
          .attr("transform", (c: CountyDataItem, i: number) => `translate(0, ${i * (this.BAR_HEIGHT + 1)})`)
          .transition(),
        (update: any) => update.transition().duration(500)
          .attr("width", (d: CountyDataItem) => this.xScale(d.value))
          .selection(),
        (exit: any) => exit,  
      )
  }

  makeLegend(): void {
    if (!this.legend) {
      this.legend = d3.select('div#disorders-legend').append('svg')
      // .attr("width", this.part1Dims.width)
      .attr("height", 120);
    }

    const tiles = [0, 1, 2, 3];
    if (!this.keyItem) {
      this.keyItem = this.legend.selectChildren('g') 
      .data(tiles) // should have numpercentiles + 1
      .join('g')
      .attr('transform', (_: any, i: number) => `translate(0, ${25* i})`)

    this.keyItem.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', 20)
      .attr('stroke', 'black')
      .attr('fill', (c: number, i: number) => (this.colorScale(c)));

    this.keyItem.append('text')
      .attr('x', 30)
      .attr('y', 13)
      .attr("font-size", 10)
      .text((t: number, i: number) => {
        if (t == 0) {
          return 'Personality Disorders';
        }
        if (t == 1) {
          return 'Bipolar Disorder';
        }
        if (t == 2) {
          return 'Depressive Disorders';
        } else {
          return 'Anxiety Disorders';
        }

      })
    }

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

  updateState(newState: SortQuery) {
    this.dataService.updateBar(newState);
    this.setScales();
    this.drawGroups();

  }

  addState(val: string): void {
    this.sortsState.stateFips.add(val)
    this.updateState(this.sortsState);
  }

  addCounty(val: string): void {
    this.sortsState.countyFips.add(val);
    this.updateState(this.sortsState);
  }

  getCountyNameByFips(fips: string): string {
    const county = this.countyData.find(d => d.fipsCode === fips);
    return county?.countyName + ', ' + county?.state;
  }

  removeState(val: string): void {
    this.sortsState.stateFips.delete(val);
    this.updateState(this.sortsState); // TODO shouldn't even have to pass in ths.state
    console.log(this.sortData)
    // this.sortsState.countyFips = new Set([...this.sortsState.countyFips].filter( f => this.countyData.find(co => co.fipsCode === f )?.state !== val ))
  }

  removeCounty(val: string): void {
    this.sortsState.countyFips.delete(val);
    this.updateState(this.sortsState);
  }

  inStateList(state: string): boolean {
    return this.sortsState.stateFips.has(state);
  }

  inCountyList(county: string): boolean {
    return this.sortsState.countyFips.has(county);
  }

}
