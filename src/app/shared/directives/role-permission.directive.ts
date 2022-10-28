import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@core/services';

@Directive({
  selector: '[permissionIsGranted]'
})
export class RolePermissionDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  @Input() set permissionIsGranted(permission: string) {
    this.isGranted(permission);
  }

  private isGranted(permission: string) {
    if (this.authService.permissionIsGranted(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}