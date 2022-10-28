import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsManagementRoutingModule } from './logs-management-routing.module';
import { LogsDetailsComponent } from './components/logs-details/logs-details.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    LogsDetailsComponent
  ],
  imports: [
    CommonModule,
    LogsManagementRoutingModule,
    SharedModule
  ]
})
export class LogsManagementModule { }
