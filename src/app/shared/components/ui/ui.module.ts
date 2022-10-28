
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { BootstrapModule } from '../../bootstrap.module';
import { NgxLoaderModule } from '@tusharghoshbd/ngx-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from '@app/shared/pipes/pipes.module';

import { 
  PageLoaderComponent, 
  LoaderComponent
} from '.';


@NgModule({
  declarations: [
    PageLoaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxLoaderModule,
    BootstrapModule,
    NgSelectModule,
    PipesModule
  ],
  exports: [
    PageLoaderComponent,
    LoaderComponent
  ],
  entryComponents: [

  ]
})
export class UIModule { }
