import { AppConfigService } from './../services';

export function appInitConfig(appConfigService: AppConfigService) {
    return () => appConfigService.loadAllRolePermissions();
}