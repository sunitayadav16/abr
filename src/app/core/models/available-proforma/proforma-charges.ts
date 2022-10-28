export interface ProformaChargesDetailsResponseModel {
    projectId: number,
    projectName: string,
    serviceId: number,
    serviceName: string,
    taskId: number,
    taskName: string,
    date: Date,
    hourlyRate: number,
    totalCharges: string,
    time: number,
    proformaTotal: number,
    description: string,
    value: string,
    userName: string,
    isDeferred: boolean
}

export interface ProformaChargesResponseModel {
    deferralsList: DeferralList[],
}

export interface DeferralList{
        taskId?: number;
        proformaChargesId?: number;
        isDeferred: boolean;
        projectId?: number;
        serviceId?: number;
}