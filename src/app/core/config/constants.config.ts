export const StorageKeys = {
    AuthToken: 'authToken',
    RefreshToken: 'refreshToken',
    UserDetails: 'user',
    UserCurrentRole: 'currentRole'

}

export const GridColumnStorageKeys = {
    ProformaDetails: 'proformaDetails',
    ProformaList: 'proformaList',
    T2HourList: 't2HourList'
}

export const Messages = {
    Error: {
        UnexptectedError: "Something went wrong!! Please try again later.",
        RolesStaticError: "Please select at least one role for ",
        NoChangesFoundError: 'No changes found.',
        ConfirmationMessage: 'Are you sure you want to ',
        ProformaUploadConfirmationMessage: "Upload Proforma and T2Hours both files.",
        AtleastOneUpload: 'Please upload at least one file'
    },
    Success: {

    },
    Warning: {
        RequiredField: "Please enter the required field.",
        RequiredFields: "Please enter the required fields.",
        NegativeAmount: "FIELD amount should not be positive .",
        PositiveAmount: "FIELD amount should not be negative .",
        InvalidRangeAmount: "FIELD amount is invalid.",
        InvalidDeferral: "Deferral amount should be less or equal to charge total.",
        Reasons: "Please enter the TEXT value."
    }
}

export const ApplicationLinks = {
    originalABRLink: 'https://buckglobal.sharepoint.com/:f:/s/ABRPlatformSupport/EhRyHHnEBbJAuWqk5yxX0vYBh9snAgQFAxNQepCHTstRmA?e=yfLKjW'
}
