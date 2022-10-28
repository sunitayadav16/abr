export interface ProxyUserResponseModel {
    usersList: ProxyUserDetails[];
    proxyUsers: ProxyUserDetails[];
}

export interface UpdateProxyUserModel {
    userId: number;
    proxyUserId: string;
    userManagement: boolean;
}

export interface ProxyUserDetails {
    userId: number;
    name: string;
}

export interface ProxyUsersRequest {
    id: number;
    searchValue: string;
}

