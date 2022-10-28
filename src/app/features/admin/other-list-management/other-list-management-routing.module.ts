import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherListComponent, UploadListComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: OtherListComponent
  },
  {
    path: ':categoryId',
    component: OtherListComponent
  },
  {
    path: 'upload/:categoryId',
    component: UploadListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherListManagementRoutingModule { }
