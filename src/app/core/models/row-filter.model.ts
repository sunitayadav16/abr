export interface RowFilterResponse {
    proformas: RowFilterObject[];
    clients: RowFilterObject[];
    clientExecutives: RowFilterObject[];
    openAirStatus: RowFilterObject[];
    proformaStatus: RowFilterObject[];
    projectManagers: RowFilterObject[];
    billingManagers: RowFilterObject[];
}

export interface RowFilterObject {
    id: number;
    name: string;
}

export interface GlobalRowFilterModel {
    key: string;
    values: string[];
}
