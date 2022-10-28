
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { BootstrapModule } from '../../bootstrap.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { 
  CategoryDropdownComponent,
  GlobalCategoryDropdownComponent,
  ClientContactsDropdownComponent
} from '.';



@NgModule({
  declarations: [
    CategoryDropdownComponent,
    GlobalCategoryDropdownComponent,
    ClientContactsDropdownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BootstrapModule,
    NgSelectModule
  ],
  exports: [
    CategoryDropdownComponent,
    GlobalCategoryDropdownComponent,
    ClientContactsDropdownComponent,
  ],
  entryComponents: [

  ]
})
export class DropdownsModule { }
