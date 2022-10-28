import { ColumnType, DataCategory, FormControlType, Permission } from "../enums";
import { GlobalRowFilterModel } from "./row-filter.model";

export interface ListRequestModel {
    id : number;
    projectId?: number;
    proformaBatchId? : Number;
    taskId?: number;
    serviceId?: number;
    proformaId?: number;
    pageNumber: number;
    pageSize: number;
    searchValue?: string;
    sortColumn?: string;
    sortOrder?: string;
    selectGlobalCodeId? : number;
    rowFilters?: filterRequestModel[];
}

export interface filterRequestModel {
    key: string;
    value: string;
    rowFilters?: GlobalRowFilterModel[];
}

export interface GridColumn {
    ColumnName: string;
    DisplayName: string;
    ColumnType?: ColumnType;
    AllowSorting: boolean;
    ClassName?: string;

    ShowEllipse?: boolean;
    Editable?: boolean;
    FormControlType?: FormControlType;
    RowIdKey?: string;
    EntityIdKey?: string;
    Category?: DataCategory;
    DropdownSelectionKey?: string;
    RequestBody?: Object;
    FormatValue?: Function;
    CellClass?: string; 
    Hoverable?: boolean;
    // NumberType ?: boolean;
}

export interface IPagination {
    PageNo: number;
    PageSize: number;
    MaxSize: number;
    TotalItems: number;
    TotalPage: number;
}

export interface ISorting {
    OrderBy: string;
    OrderByDescending: boolean;
    ClassName: string;
}

export interface ISearching {
    Search: string;
}

export interface MenuItem {
    title: string;
    route?: string;
    requiredPermission?: Permission;
    subMenuItems?: MenuItem[];
}

export interface CategoryDropdownResponse {
    name: string;
    id: number;
}

export interface CollectionContactsRequest {
    clientId: number;
    selectClientId: number;
}

export interface CollectionContactsResponse {
    clientContactsList: CollectionContact[];
    rowsCount: number;
}

export interface CollectionContact {
    clientContactId: number;
    clientContactName: string;
    isDeleted: boolean;
}