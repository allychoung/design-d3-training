import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { CountyData, CountyDataItem, METRICS, MapState } from '../data';
import { DataService } from '../data.service';

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss', '../app.component.scss'],
  providers: [DataService],
})
export class CountryMapComponent implements OnInit {
  svg: any = null;
  g: any = null;
  legend: any = null;
  keyItem: any = null;
  data: any[] | undefined;
  geoGenerator: any;
  
  part1Dims = {
    height: 500,
    width: 800  
  };

  state: MapState = {
    point: 'AMFAR_MEDMHFAC_RATE',
    statePicked: undefined,
  };

  metrics = METRICS;
  yTitle = this.metrics.care.find(c => c.code === this.state.point)?.title;

  part1Margins = {
    left: 50,
    right: 50,
    top: 0,
    bottom: 60
  }
  NUM_PERCENTILES = 5;
  blueGreenScale = d3.scaleSequential()
      .interpolator(d3.interpolateBuPu)
      .domain([0, this.NUM_PERCENTILES]); // for quintiles

  colorScale = d3.scaleQuantile()
    // .range([...Array(this.NUM_PERCENTILES).keys()].map(n => +this.blueGreenScale(n)));

  newScale = d3.scaleSequentialSqrt().interpolator(d3.interpolateBuGn);
  geoJson: any;

  mergedData: any[] = [];
  countyData: CountyData[] = [];
  constructor(private dataService: DataService) {
    this.dataService.mapState$.subscribe((state) => {
      if (state) {
        this.state = state;
        this.yTitle = this.metrics.care.find(c => c.code === this.state.point)?.title;

        this.updateScale();
        this.updatePaths();
      }
    });
    this.dataService.countyData$.subscribe((data) => {
      if (data) {
        this.countyData = data;
        d3.json('assets/us-counties.json').then((json) => {
          this.geoJson = json;
          this.mergeData();
          this.createProjection();
          this.updatePaths();
        });    
      }
    });
  }

  ngOnInit(): void {
    if (!this.svg) {
      this.createSvg();
    }
  }

  createProjection(): void {
    // your code goes here
    const projection = d3.geoAlbersUsa().fitExtent([[0,0],
      [this.part1Dims.width - this.part1Margins.right - this.part1Margins.left, 
        this.part1Dims.height - this.part1Margins.bottom - this.part1Margins.top]],
        this.geoJson);

    this.geoGenerator = d3.geoPath().projection(projection);
    this.updateScale();
  }

  updateScale(): void {
    if (this.countyData.length == 0) {
      return;
    }

    this.colorScale.domain(d3.sort(this.countyData.map((c: CountyData) => { 
      const m = c.metrics.care.findIndex(s => s.code === this.state.point);
      return c.metrics.care[m].value;
    })) as number[]).range([...Array(this.NUM_PERCENTILES).keys()]);
    // console.log(this.colorScale.domain())
    // console.log(this.colorScale(0));

    this.newScale.domain(d3.extent(this.countyData.map((c: CountyData) => { 
      const m = c.metrics.care.findIndex(s => s.code === this.state.point);
      return c.metrics.care[m].value;
    })) as number[])

    this.updateLegend();
  }

  updateLegend(): void {
    if (!this.legend) {
      this.legend = d3.select('div#quintiles').append('svg')
      // .attr("width", this.part1Dims.width)
      .attr("height", 120);
    }

  const tiles = d3.sort([...d3.extent(this.colorScale.domain()), ...this.colorScale.quantiles()]);
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
    .attr('fill', (c: number, i: number) => i >= this.NUM_PERCENTILES ? 'white' : this.blueGreenScale(this.colorScale(c)));

  this.keyItem.append('text')
    .attr('x', 30)
    .attr('y', 13)
    .attr("font-size", 10)
    .text((t: number, i: number) => i < this.NUM_PERCENTILES ? t + ' - ' + tiles[i + 1] : 'No data')
  }
  this.keyItem.select('text').text((t: number, i: number) => i < this.NUM_PERCENTILES ? t + ' - ' + tiles[i + 1] : 'No data')

  }

  updatePaths(): void {
    if (!this.g) {
      return;
    }
    console.log('called update paths')
    this.g.selectChildren('path')
        .data(this.mergedData, (c: any) => c.fipsCode)
        .join(
          (enter: any) => enter.append('path')
            .attr('fill', (c: any) => {
              let d = c.care?.find((i: CountyDataItem) => i.code === this.state.point);
              return d ? this.blueGreenScale(this.colorScale(+d.value)) : 'white';
            })
            .attr('stroke', 'gray')
            .attr('stroke-width', .3)      
            .attr('d', this.geoGenerator),
          (update: any) => update.transition().duration(1000)
          .attr('fill', (c: any) => {
              let d = c.care?.find((i: CountyDataItem) => i.code === this.state.point) as CountyDataItem;
              return d ? this.colorScale(+d.value) : 'white';
            }),
        (exit: any) => exit,  
        )
        // .attr('fill', 'green')
  }

  mergeData(): void {
    this.mergedData = this.geoJson.features.map((geo: any) => {
      const res = this.countyData.filter(depr => geo.id === depr.fipsCode);
      return {...geo, care: res.length > 0 ? res[0].metrics.care : undefined }
    });
  }
  
  createSvg(): void {
    this.svg = d3.select('div#country-map')
      .append("svg")
      .attr("width", this.part1Dims.width)
      .attr("height", this.part1Dims.height)
      .attr("viewBox", [0, 0, this.part1Dims.width, this.part1Dims.height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    
    // append a group element to the svg and offset it by the top and left margins
    this.g = this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.part1Margins.left + "," + this.part1Margins.top + ")"
      );
  } 

  updateState(val: string): void {
    if (val !== this.state.point) {
      this.dataService.updateMap({...this.state, point: val}); 
    }
  }
  
}
