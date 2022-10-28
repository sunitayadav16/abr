import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherListManagementRoutingModule } from './other-list-management-routing.module';
import { OtherListComponent, UploadListComponent } from './components';
import { OtherListService } from './services';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    OtherListComponent,
    UploadListComponent
  ],
  imports: [
    CommonModule,
    OtherListManagementRoutingModule,
    SharedModule
  ],
  providers: [OtherListService]
})
export class OtherListManagementModule { }
