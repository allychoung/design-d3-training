import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';
import { CountyData, METRICS, ScatterState } from './data';

@Injectable({
    providedIn: 'root',
})
export class DataService {    
    countyData$ = new BehaviorSubject<CountyData[]>([]);
    countyData: CountyData[] = [];

    selectionState$ = new BehaviorSubject<any>(null);
    selectionState: {bar: string[], scatter: string[], map: string[]} = {
        bar: [],
        scatter: [],
        map: [],
    };

    scatterState$ = new BehaviorSubject<any>(null);
    scatterState: ScatterState = {
        x: 'SAIPE_PCT_POV',
        y: 'AMFAR_MEDMHFAC_RATE',
        fips: [],
    };

    updateScatter(newState: ScatterState): void {
        this.scatterState$.next(newState);        
    }


    // private _state: State;

    // public get state() {
    //     return this._state;
    // }
    // public set state(state) {
    //     this._state = state;
    //     // this.stateChanged.emit(true);
    // }

    // stateChanged = new EventEmitter<boolean>();

    constructor() {
        d3.csv('assets/SDOH_2020_COUNTY_1_0.csv', d3.autoType).then((data) => {
            const cleanedData = this.cleanData(data);
            // this.countyData = cleanedData;
            this.countyData$.next(cleanedData);
            d3.json('assets/us-counties.json').then((data) => {
                // TODO merge with county data
            });
        });

        this.scatterState$.next(this.scatterState);
    }

    getCountyData(): Promise<CountyData[]> {
        return d3.csv('assets/SDOH_2020_COUNTY_1_0.csv', d3.autoType).then((data) => {
            const cleanedData = this.cleanData(data);
            return cleanedData;
            // d3.json('assets/us-counties.json').then((data) => {
            //     // TODO merge with county data
            // });
        });
    }

    cleanData(data: any[]): CountyData[] {
        return data.map((v) => {
            return {
                fipsCode: v.COUNTYFIPS,
                countyName: v.COUNTY,
                state: v.STATE,
                metrics: {
                    care: METRICS.care.map(c => {
                        return {code: c.code, value: +v[c.code]};
                    }),
                    population: METRICS.population.map(c => {
                        return {code: c.code, value: +v[c.code]};
                    }),
                    disorder: METRICS.disorder.map(c => {
                        return {code: c.code, value: +v[c.code]};
                    }),
                }
            }
        });
    }

    filterCountyData(query: any) {}

    mergeCoutiesGeoJson() {}

}
