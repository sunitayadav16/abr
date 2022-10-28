import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { TooltipModule } from "ngx-bootstrap/tooltip";
import { AccordionModule } from "ngx-bootstrap/accordion";



@NgModule({
  imports: [
    CommonModule,

    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  exports: [
    ModalModule,
    PaginationModule,
    BsDropdownModule,
    BsDatepickerModule,
    TabsModule,
    TooltipModule,
    AccordionModule
  ],
  declarations: []
})
export class BootstrapModule {}