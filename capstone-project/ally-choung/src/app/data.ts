export interface State {
    type: StateType;
    selectedOptions: UserOption[];
}

export interface ScatterState {
    x: string, 
    y: string, 
    fips: string[],
}

export interface MapState {
    point: string, 
    statePicked: string | undefined,
}

export enum StateType {
    countryMap = 'MAP',
    scatterPlot = 'PLOT',
    barChart = 'BAR',
}

export interface UserOption {
    name: string;
    id: string;
}

export interface DataPoint extends UserOption {
    axis: 'X' | 'Y';
}

export interface CheckboxData extends UserOption {
    checked: boolean;
}

export interface CountyDataItem {
    code: string,
    value: number,
}

export interface CountyData {
    fipsCode: string,
    countyName: string,
    state: string,
    metrics: { care: CountyDataItem[], population: CountyDataItem[], disorder: CountyDataItem[] },
};

export interface ColumnData {
    title: string,
    code: string,
    definition: string,
}

export interface MetricsData {
    care: ColumnData[];
    population: ColumnData[];
    disorder: ColumnData[];
}

export enum MetricType {
    care = 'CARE',
    population = 'POPULATION',
    disorder = 'DISORDER',
}
export const METRICS: MetricsData = {
    care: [
        { 
            title: 'Total number of facilities that provide mental health services per 1,000 population',
            code: 'AMFAR_MEDMHFAC_RATE',
            definition: ''
        },
        { 
            title: 'Total number of facilities that provide mental health services per 1,000 population',
            code: 'AMFAR_MHFAC_RATE',
            definition: ''
        },
        { 
            title: 'Total number of mental health care providers per 100,000 population',
            code: 'CHR_MENTAL_PROV_RATE',
            definition: ''
        },
        { 
            title: 'Health Professional Shortage Area (HPSA) code-shortage of primary care physicians',
            code: 'AHRF_HPSA_MENTAL',
            definition: ''
        },
    ],
    population: [
        { 
            title: 'Estimated percentage of people of all ages in poverty',
            code: 'SAIPE_PCT_POV',
            definition: ''
        },
        { 
            title: 'USDA Rural-Urban Continuum Code 2013',
            code: 'AHRF_USDA_RUCC_2013',
            definition: ''
        },
        { 
            title: 'Percentage of population with any Medicaid/means-tested public health insurance coverage',
            code: 'ACS_PCT_MEDICAID_ANY',
            definition: ''
        },
    ],
    disorder: [
        { 
            title: 'Prevalence of personality disorders among Medicare (dual and non-dual) beneficiaries',
            code: 'MMD_PERSONALITY_DISD',
            definition: ''
        },
        { 
            title: 'Prevalence of bipolar disorder among Medicare (dual and non-dual) beneficiaries',
            code: 'MMD_BIPOLAR_DISD',
            definition: ''
        },
        { 
            title: 'Prevalence of anxiety disorders among Medicare (dual and non-dual) beneficiaries',
            code: 'MMD_ANXIETY_DISD',
            definition: ''
        },
        { 
            title: 'Prevalence of depressive disorders among Medicare (dual and non-dual) beneficiaries',
            code: 'MMD_DEPR_DISD',
            definition: ''
        },
    ]
};
