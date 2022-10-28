export interface ProformaDetailsRequest {
    proformaId: number;
    proformaNotes: string;
    internalNotes: string;
    proformaLayoutId: number;
    collectionsContactId: number
}


export interface ActionPerformedByGOTRequest {
    proformaId: number;
    actionPerformed: string;
}

export interface AdditionalNotesRequest {
    proformaId: number;
    additionalNotes: string;
}

export interface AddUpdateInstructionsRequest {
    proformaBatchId: number;
    instructions: string;
}

export interface UploadedDocumentResponse {
    fileId: number;
    fileName: string;
    filePath: string;
    fileType: string;
    size: string;
}