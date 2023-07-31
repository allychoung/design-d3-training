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
    axis: string;
}

export interface CheckboxData extends UserOption {
    
}
