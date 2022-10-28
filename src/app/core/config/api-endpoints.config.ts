export const ApiEndpoints = {
    Auth: {
        Login: 'Auth/Login',
        SetPassword: 'Auth/SetPassword',
        ValidateToken: 'Auth/ValidateToken',
        ForgotPassword: 'Auth/ForgotPassword'
    },
    Common: {
        GetRoles: 'Common/GetRoles',
        UserRolesList: 'Common/GetUserRoleList',
        UpdateRole: 'Common/UpdateUserRoles',
        GetPermissions : 'Common/GetPermissions',
        RolePermissionsList :'Common/GetRolesPermissions',
        UpdatePermission : 'Common/UpdateUserPermissions', 
        UserBulkRolesList: 'Common/GetBulkRolesList',
        UsersAssociatedRoles: 'Common/GetUsersAssociatedRoles',
        GetGlobalCodes: 'Common/GetGlobalCodes',
        CollectionContacts: 'Common/GetCollectionContacts',
        FileUpload: 'Common/FileUpload',
        DeleteProformaUploadedFile: 'Common/DeleteProformaUploadedFile',
        DownloadFile: 'Common/DownloadFile'
    },
    Token: {
        Refresh: 'Token/refresh',
        Revoke: 'Token/revoke'
    },
    User: {
        UserList: 'User/UserList',
        AddUser: 'User/CreateUser',
        UpdateUser: 'User/Update',
        DeleteUser: 'User/Delete',
        ChangeStatus: 'User/ChangeStatus',
        ChangePassword: 'UserDetail/ChangePassword',
    },
    ProxyUser: {
        ProxyUsersList: 'ProxyUser/GetProxyUserList',
        UpdateProxyUser: 'ProxyUser/UpdateProxyUser',
        StartMimicUser: 'ProxyUser/StartMimicUser',
        AvailableMimicingUser : 'ProxyUser/AvailableMimicUser'
    },
    Proforma: {
        ProformaBatchList: 'ProformaBatch/ProformaBatchList',
        UpdateProformaBatchStatus: 'ProformaBatch/UpdateProformaBatchStatus',
        UploadPerformaBatch: 'ProformaBatch/UploadProformaBatch',
        DeleteProformaBatch: 'ProformaBatch/DeleteProformaBatch',
        ValidateProformaBatch : 'ProformaBatch/ValidateProforma',
        ProformaBatchDetail: 'ProformaBatch/ProformaBatchDetail',
        UploadBillsExcel: 'ProformaBatch/UploadBillsExcel',
        T2HoursList: 'ProformaBatch/GetT2HoursList',
        ProformaList: 'ProformaBatch/GetProformaList',
        UpdateSingleCell: 'ProformaBatch/UpdateSingleCell',
        UpdateAdditionalNotes: "ProformaBatch/UpdateAdditionalNotes",
        SaveProformaDetails: "ProformaBatch/SaveProformaDetails",
        SubmitABR: "ProformaBatch/SubmitABR",
        ActionsPerformedByGOT: "ProformaBatch/ActionsPerformedByGOT",
        AddUpdateInstructions : 'ProformaBatch/UpdateProformaInstructions',
    },
    AvailableProforma :{
        AvailableProformaList : 'ProformaBatch/GetAvailableProformaList',
        ProformaDetails: 'ProformaBatch/GetProformaDetails'
    },
    Adjustments :{
        GetAdjustmentsDetails: "Adjustments/GetAdjustmentDetails",
        SaveAdjustments: "Adjustments/SaveAdjustments",
        ProformaChargesDetails :'Adjustments/GetProformaCharges',
        RowFilterData: 'Adjustments/GetRowFiltersData',
        SaveDeferrals: "Adjustments/SaveDeferrals"
    },
    
    ProformaDetails :{
        ProformaLineDetails : 'ProfromaDetail/ProformaLineDetail',
        FullProformaDetails : 'ProfromaDetail/ProformaFullDetails',
        T2HoursDetails: 'ProfromaDetail/GetT2HoursDetails',
        ProformaListRowFiltersData: 'ProfromaDetail/GetProformaListRowFiltersData',
        T2HoursRowFilterData : 'ProfromaDetail/GetT2HoursRowFilter',
    },
    ProfileDetails :{
        UserDetails : 'UserDetail/UserDetail',
        UpdateUserDetails : 'UserDetail/UpdateUserDetail',
        SetPrimaryRole : 'UserDetail/SetPrimaryRole',
        SwitchRole: 'UserDetail/SwitchRole',
    },

    DownloadExcel :{
        DownloadExcel: "DownloadExcel/DownloadExcel"
    },
    UploadOtherExcels : {
        UploadGlobalCodes: "UploadOtherExcels/UploadGlobalCodes",
        UploadCollectionContacts: "UploadOtherExcels/UploadCollectionContacts",
        GetCollectionContactsForBatch: "UploadOtherExcels/GetCollectionContactsForBatch",
        UploadOpenAirStatus: "UploadOtherExcels/UploadOpenAirStatus",  
    },
    Logs : {
        UserDetails : 'Logs/GetUsersListForLogs',
        ProformaIdDetails : 'Logs/GetProformasListForLogs',
        UserLogs: 'Logs/GetUsersLogs',
        ProformaBatchLogs : 'Logs/GetProformaBatchesLogs',
        UserRolesLogs : 'Logs/GetUserRolesLogs',
        ProformaInvoicesLogs :'Logs/GetProformaInvoicesLogs',
        ProxyUsersLogs : 'Logs/GetProxyUsersLogs',
        UnsentEmailsLogs : 'Logs/GetUnSentEmailsLogs',
        ProformaInLineLogs : 'Logs/GetProformaInlinesLogs',
        GetProjectListForLogs : 'Logs/GetProjectsOfProformaForLogs',
        GetServicesListForLogs : 'Logs/GetServicesOfProformaForLogs',
        GetTaskListForLogs : 'Logs/GetTasksOfProformaForLogs'
    }
    
};