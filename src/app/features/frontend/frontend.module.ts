import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalService } from '@app/shared/services';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import {
  AvailableProformasComponent, DropBoxComponent, 
  ProformaChargesComponent, ProformaDetailsComponent, ProformaFullDetailsComponent, 
  ProformaLineDetailsComponent, ProgressBarComponent, T2HoursComponent, MakeAdjustmentsComponent
} from './components';
import { FrontendRoutingModule } from './frontend-routing.module';
import { MakeAdjustmentService, ProformaService } from './services';

@NgModule({
  declarations: [
    AvailableProformasComponent,
    ProformaDetailsComponent,
    ProgressBarComponent,
    DropBoxComponent,
    T2HoursComponent,
    ProformaChargesComponent,
    ProformaLineDetailsComponent,
    ProformaFullDetailsComponent,
    MakeAdjustmentsComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,

    FrontendRoutingModule
  ],
  providers: [
    ModalService,
    ProformaService,
    MakeAdjustmentService,
  ]
})
export class FrontendModule { }
