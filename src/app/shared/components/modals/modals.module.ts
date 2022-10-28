import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BootstrapModule } from '@shared/bootstrap.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { DropdownsModule } from '../dropdowns/dropdowns.module';

import { 
  BaseModalComponent,
  ConfirmationModalComponent,
  CellEditModalComponent,
  AdditionalNotesComponent,
  ViewInstructionsModalComponent
 } from '.';


@NgModule({
  declarations: [
    BaseModalComponent,
    ConfirmationModalComponent,
    CellEditModalComponent,
    AdditionalNotesComponent,
    ViewInstructionsModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BootstrapModule,

    DropdownsModule,
    PipesModule
  ],
  exports: [
    BaseModalComponent
  ],
  providers: []
})
export class ModalsModule { }
