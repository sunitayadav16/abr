
import { NgModule } from '@angular/core';

import { CommonComponentsModule } from './common/common-components.module';
import { ModalsModule } from './modals/modals.module';
import { UIModule } from './ui/ui.module';
import { DropdownsModule } from './dropdowns/dropdowns.module';


@NgModule({
  declarations: [

  ],
  imports: [
    
  ],
  exports: [
    CommonComponentsModule,
    UIModule,
    ModalsModule,
    DropdownsModule
  ]
})
export class ComponentsModule { }
