import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProformaBatchListComponent, ProformaListComponent, UploadBatchComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ProformaBatchListComponent
  },
  {
    path: 'upload',
    component: UploadBatchComponent
  },
  {
    path: 'batch/:proformaBatchId',
    component: ProformaListComponent    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaManagementRoutingModule { }
