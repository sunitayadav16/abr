import { PipesModule } from '@shared/pipes/pipes.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { BootstrapModule } from '../../bootstrap.module';
import { DragDropModule} from '@angular/cdk/drag-drop';

import { 
  CommonGridComponent,
  CommonGridAltComponent,
  ShowHideGridColumnsComponent,
  GlobalRowFilterComponent,
  SingleFilterBlockComponent,
  CommonMimicUserComponent
} from '.';



@NgModule({
  declarations: [
    CommonGridComponent,
    CommonGridAltComponent,
    ShowHideGridColumnsComponent,
    GlobalRowFilterComponent,
    SingleFilterBlockComponent,
    CommonMimicUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BootstrapModule,
    DragDropModule,
    PipesModule
  ],
  exports: [
    CommonGridComponent,
    CommonGridAltComponent,
    ShowHideGridColumnsComponent,
    GlobalRowFilterComponent,
    CommonMimicUserComponent
  ],
  entryComponents: [

  ]
})
export class CommonComponentsModule { }
