export enum Permission {
    AllAccess = "AllAccess",

    /* Module level permissions */
    UserManagement = "UserManagement", // Will Allow user to access User listing & Bulk User role update
    RoleManagement = "RoleManagement", // Role Management manupulation
    ProformaManagement = "ProformaManagement", // Upload perform, Batch Listing, proforma Listing
    OtherListsManagement = "OtherListsManagement",
    LogsManagement = "LogsManagement",
    ReportingManagement = "ReportingManagement",


    /* Need to remmove */ 
    Adjustments = "Adjustments",
    Approvals = "Approvals",
    /* ---- */ 


    /* Action level permissions */
    ProxyAssignments = "ProxyAssignments",
    AbilityToProxy = "AbilityToProxy",
    AllAvailbleProformas = "AllAvailbleProformas",
    EditAdjustments = "EditAdjustments",
    ABRFileUploads = "ABRFileUploads",
    SaveUpdates = "SaveUpdates",
    SaveABR = "SaveABR",
    SubmitABR = "SubmitABR",
    PendingByGOT = "PendingByGOT",
    ProcessedByGOT = "ProcessedByGOT",
    RejectedByGOT = "RejectedByGOT",
    RowFilters = "RowFilters",
    ColumnFilters = "ColumnFilters",

}