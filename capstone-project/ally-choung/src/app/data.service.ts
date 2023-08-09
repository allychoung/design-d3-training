import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
    providedIn: 'root',
})
export class DataService {    
    constructor() {
    }

    getCountyData(): Promise<Array<any>> {
        return d3.csv('assets/SDOH_2020_COUNTY_1_0.csv', d3.autoType);
    }
}
