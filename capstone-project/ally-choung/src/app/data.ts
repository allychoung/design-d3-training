export interface State {
    type: StateType;
    selectedOptions: UserOption[];
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

export interface CountyData {

}

export const METRICS = {
    care: [
        { 
            title: '',
            colName: ''
        },
        { 
            title: '',
            colName: ''
        },
        { 
            title: '',
            colName: ''
        },
    ],
    population: [
        { 
            title: '',
            colName: ''
        },
        { 
            title: '',
            colName: ''
        },
        { 
            title: '',
            colName: ''
        },
    ],
    disorder: [
        { 
            title: '',
            colName: ''
        },
        { 
            title: '',
            colName: ''
        },
        { 
            title: '',
            colName: ''
        },
        { 
            title: '',
            colName: ''
        },
    ]
};
