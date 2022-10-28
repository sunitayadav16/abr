import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Third Party Modules
import { NgSelectModule } from '@ng-select/ng-select';

import { BootstrapModule } from './bootstrap.module';

// Custom Modules
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from './services';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    BootstrapModule,

    NgSelectModule,

    ComponentsModule,
    PipesModule,
    DirectivesModule,


  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,

    BootstrapModule,

    ComponentsModule,
    PipesModule,
    DirectivesModule,

    NgSelectModule,
    DragDropModule

  ],
  providers: [
    ModalService,
    DatePipe
  ]
})
export class SharedModule { }
