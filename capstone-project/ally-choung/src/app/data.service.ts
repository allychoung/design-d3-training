import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CountyData, METRICS, MapState, ScatterState, SortQuery } from './data';

@Injectable({
    providedIn: 'root',
})
export class DataService {    
    // countyData$ = new BehaviorSubject<CountyData[]>([]);
    // countyData: CountyData[] = [];

    countyData$ = new Subject<CountyData[]>();
    countyData: CountyData[] = [];

    // sortedData$ = new BehaviorSubject<CountyData[]>([]);
    // sortedData: CountyData[] = [];
    stateList$ = new BehaviorSubject<string[]>([]);
    stateList: string[] = [];

    // selectionState$ = new BehaviorSubject<any>(null);
    // selectionState: {bar: string[], scatter: string[], map: string[]} = {
    //     bar: [],
    //     scatter: [],
    //     map: [],
    // };

    scatterState$ = new BehaviorSubject<ScatterState>({
        x: 'SAIPE_PCT_POV',
        y: 'AMFAR_MEDMHFAC_RATE',
        fips: [],
    });

    scatterState: ScatterState = {
        x: 'SAIPE_PCT_POV',
        y: 'AMFAR_MEDMHFAC_RATE',
        fips: [],
    };

    sortsState: SortQuery = {
        stateFips: new Set(),
        countyFips: new Set(),
      };
    sortsState$ = new BehaviorSubject<SortQuery>(this.sortsState);
    

    mapState$ = new BehaviorSubject<any>(null);
    mapState: MapState = {
        point: 'AMFAR_MEDMHFAC_RATE',
        statePicked: undefined
    };

    // sortData(sorts: SortQuery): void {
    //     const newData: CountyData[] = this.sortedData
    //     this.sortedData$.next()
    // }


    updateScatter(newState: ScatterState): void {
        this.scatterState$.next(newState);        
    }

    updateMap(newState: MapState): void {
        this.mapState$.next(newState);        
    }

    updateBar(newState: SortQuery): void {
        this.sortsState$.next(newState);        
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
        if (this.countyData.length == 0) {
            console.log('data here');
            d3.csv('assets/SDOH_2020_COUNTY_1_0.csv', d3.autoType).then((data) => {
                const cleanedData = this.cleanData(data);
                this.countyData = cleanedData;
                this.countyData$.next(this.countyData);
                this.stateList$.next([...new Set(cleanedData.map(c => c.state))]);
            });
        }

        this.scatterState$.next(this.scatterState);
        this.mapState$.next(this.mapState);
        this.sortsState$.next(this.sortsState);
    }

    getCountyData(): Observable<CountyData[]> {
        return this.countyData$;
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
