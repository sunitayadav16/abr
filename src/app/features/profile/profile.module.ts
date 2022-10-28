import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/layout/layout.module';
import { ModalService } from '@app/shared/services';
import { SharedModule } from '@app/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module.ts.routing';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileDetailsService } from './services/profile-details.service';
import { UserService } from '../admin/user-management/services/user.service';



@NgModule({
  declarations: [
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    ProfileRoutingModule
  ],
  providers: [
    ModalService,
    ProfileDetailsService,
  ]
})
export class ProfileModule { }
