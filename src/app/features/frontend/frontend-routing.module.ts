import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedChangesCheckGuard } from '@app/core/guards/unsaved.guard';
import { MainLayoutComponent } from 'src/app/layout/layouts';
import { AvailableProformasComponent, 
  MakeAdjustmentsComponent, 
  ProformaChargesComponent, 
  ProformaDetailsComponent, 
  ProformaFullDetailsComponent, 
  ProformaLineDetailsComponent, 
  T2HoursComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: AvailableProformasComponent,
      },
      {
        path: 'proforma-details/:proformaId',
        component: ProformaDetailsComponent,
        canDeactivate: [UnsavedChangesCheckGuard]
      },
      {
        path: 'make-adjustment/:proformaId/:projectId/:serviceId/:taskId',
        component: MakeAdjustmentsComponent
      },
      {
        path: 't2-hours/:proformaId/:projectId/:taskId',
        component: T2HoursComponent
      },
      {
        path: 'proforma-charges/:proformaId/:projectId/:serviceId/:taskId',
        component: ProformaChargesComponent
      },
      {
        path: 'proforma-full-details/:proformaId',
        component: ProformaFullDetailsComponent
      },
      {
        path: 'proforma-line-details/:proformaId/:projectId/:serviceId/:taskId/:clientId',
        component: ProformaLineDetailsComponent
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
