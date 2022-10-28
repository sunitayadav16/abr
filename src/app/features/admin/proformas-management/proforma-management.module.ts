import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ProformaManagementRoutingModule } from './proforma-management-routing.module';

import { ProformaManagementService } from './services/performa-management.service';

import { ProformaBatchListComponent, 
  ProformaListComponent, 
  UploadModalComponent, 
  UploadBatchComponent, 
  ProformaListTabComponent, 
  T2HourListTabComponent,
  InstructionModalComponent } from './components';


@NgModule({
  declarations: [
    UploadBatchComponent,
    UploadModalComponent,
    ProformaListComponent,
    ProformaBatchListComponent,
    ProformaListTabComponent,
    T2HourListTabComponent,
    InstructionModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    ProformaManagementRoutingModule
  ],
  entryComponents: [
    UploadModalComponent
  ],
  providers: [
    ProformaManagementService
  ]
})
export class proformaManagementModule { }
