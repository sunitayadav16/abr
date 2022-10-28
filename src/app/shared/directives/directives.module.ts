import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareDirective } from './compare.directive';
import { FormsModule } from '@angular/forms';
import { RolePermissionDirective } from './role-permission.directive';
import { DndDirective } from '.';


@NgModule({
  declarations: [
    CompareDirective,
    RolePermissionDirective,
    DndDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CompareDirective
  ]
})
export class DirectivesModule { }
