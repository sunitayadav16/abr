import { Injectable } from '@angular/core';

import { appMenuItems } from '@core/config';

import { AuthService } from '@core/services';
import { MenuItem } from '@core/models';


@Injectable()
export class NavigationService {
    private appMenuItems = appMenuItems;

    constructor(
        private authService: AuthService,
    ) { }

    buildUserMenuItems() {
        const userMenuItems: MenuItem[] = [];
        for (let menuItem of this.appMenuItems) {
            const subMenuItems: MenuItem[] = menuItem?.subMenuItems || [];

            // Handle If Menu has no sub items
            if (subMenuItems.length == 0) {
                const isMenuItemAcessible = this.checkMenuItemAvailablity(menuItem);
                if (isMenuItemAcessible) userMenuItems.push(menuItem);
                continue;
            }

            // Handle If Menu has sub items
            if (subMenuItems.length > 0) {
                const availableSubMenuItems: MenuItem[] = [];

                subMenuItems.forEach((subMenuItem) => {
                    const isSubMenuItemAcessible = this.checkMenuItemAvailablity(subMenuItem);
                    if (isSubMenuItemAcessible) availableSubMenuItems.push(subMenuItem);
                });

                if (availableSubMenuItems.length > 0) userMenuItems.push({ ...menuItem, subMenuItems: availableSubMenuItems });
                continue;
            }
        }
        return userMenuItems;
    }

    checkMenuItemAvailablity(menuItem: MenuItem) {
        return menuItem.requiredPermission ?
            this.authService.permissionIsGranted(menuItem.requiredPermission) :
            true;
    }

}