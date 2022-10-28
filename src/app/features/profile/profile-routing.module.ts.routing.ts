import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { MainLayoutComponent } from '@app/layout/layouts';



const routes: Routes = [
  {
    path : '',
    component : MainLayoutComponent,
    children :[
      {  
      path : 'user-info/:id',
      component : ProfileInfoComponent,}
    ]
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule{}
