import { Component, Input, OnInit } from '@angular/core';
import { ColumnData } from '../data';

@Component({
  selector: 'app-data-points',
  templateUrl: './data-points.component.html',
  styleUrls: ['./data-points.component.scss', '../app.component.scss']
})
export class DataPointsComponent implements OnInit {

  @Input() metricType: string = '';
  @Input() dataPoints: ColumnData[] = [];

  boxTitle = 'Data Points';
  constructor() {}
  ngOnInit(): void {
    if (this.metricType === 'population') {
      this.boxTitle = 'Population Demographic Metrics';
    } else if (this.metricType === 'care') {
      this.boxTitle = 'Access to MH Care Metrics';
    }
  }


  clickBtn(codeId: string) {
    throw new Error('Method not implemented.');
  }
    
}
