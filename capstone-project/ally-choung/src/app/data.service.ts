import { CountyData } from "./data";

export class DataService {
    private data: CountyData[] = [];
  
    // constructor(
    //   private backend: BackendService,
    //   private logger: Logger) { }
  
    constructor() {
        fetch('./data/SDOH_2020_COUNTY_1_0.csv')
            .then((response) => response.json());
    }

    getCountyData() {

    }
}
