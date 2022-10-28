import { Permission } from "../enums";
import { MenuItem } from "../models";

export const appMenuItems: MenuItem[] = [{
    title: 'Available Proformas',
    route: '/home',
}, {
    title: 'Proforma Management',
    route: '/admin/proforma-management',
    requiredPermission: Permission.ProformaManagement
}, {
    title: 'User Management',
    subMenuItems: [{
        title: 'User Management',
        route: '/admin/user-management',
        requiredPermission: Permission.UserManagement
    }, {
        title: 'Bulk Role Assignment',
        route: '/admin/bulk-role-assignment',
        requiredPermission: Permission.UserManagement
    }, {
        title: 'Role Management',
        route: '/admin/role-management',
        requiredPermission: Permission.RoleManagement
    }]
},{
    title: 'Audit Log management',
    subMenuItems: [{
        title: 'User Details Log',
        route: '/admin/logs-management/user-log',
        requiredPermission: Permission.LogsManagement
    }, {
        title: 'User Roles Log',
        route: '/admin/logs-management/user-roles-log',
        requiredPermission: Permission.LogsManagement
    }, {
        title: 'User Proxy Log',
        route: '/admin/logs-management/proxy-user-log',
        requiredPermission: Permission.LogsManagement
    }, {
        title: 'Proforma Batch Log',
        route: '/admin/logs-management/proforma-batch-log',
        requiredPermission: Permission.LogsManagement
    },
    {
        title: 'Proforma Invoice Log',
        route: '/admin/logs-management/proforma-invoices-log',
        requiredPermission: Permission.LogsManagement
    },
    {
        title: 'Proforma Line Detail Log',
        route: '/admin/logs-management/proforma-inline-log',
        requiredPermission: Permission.LogsManagement
    },
    {
        title: 'Emails Log',
        route: '/admin/logs-management/emails-log',
        requiredPermission: Permission.LogsManagement
    }
   ]
}, {
    title: 'Other lists management',
    subMenuItems: [{
        title: 'Proforma Layout',
        route: '/admin/other-list-management/5',
        requiredPermission: Permission.OtherListsManagement
    }, {
        title: 'WU/D Category',
        route: '/admin/other-list-management/6',
        requiredPermission: Permission.OtherListsManagement
    }, {
        title: 'New Advance Bill Category',
        route: '/admin/other-list-management/7',
        requiredPermission: Permission.OtherListsManagement
    }, {
        title: 'Collection Contacts',
        route: '/admin/other-list-management/-1',
        requiredPermission: Permission.OtherListsManagement
    }]
} ];
