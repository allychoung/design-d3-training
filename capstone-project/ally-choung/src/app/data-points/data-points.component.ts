import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnData } from '../data';

@Component({
  selector: 'app-data-points',
  templateUrl: './data-points.component.html',
  styleUrls: ['./data-points.component.scss', '../app.component.scss'],
})
export class DataPointsComponent implements OnInit {

  @Input() metricType: string = '';
  @Input() dataPoints: ColumnData[] = [];
  @Input() selectedId: string = '';
  @Output() emitClick = new EventEmitter<string>();

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
    if (codeId !== this.selectedId) {
      this.selectedId = codeId;
      this.emitClick.emit(codeId);
    }
  }
    
}
