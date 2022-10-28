import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckObjectKeyValuePipe, ObjectPropertyByKeyPipe, AmountPipe, LimitToPipe, SanitizeHtmlPipe } from '.';
import { UrlifyPipe } from './urlify.pipe';

@NgModule({
  declarations: [	
    SanitizeHtmlPipe,
    LimitToPipe,
    ObjectPropertyByKeyPipe,
    CheckObjectKeyValuePipe,
    AmountPipe,
    UrlifyPipe
   ],
  imports: [
    CommonModule
  ],
  exports: [
    SanitizeHtmlPipe,
    LimitToPipe,
    ObjectPropertyByKeyPipe,
    CheckObjectKeyValuePipe,
    AmountPipe,
    UrlifyPipe
  ]
})
export class PipesModule { }
