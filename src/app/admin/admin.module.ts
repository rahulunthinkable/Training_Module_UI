import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTableComponent } from './admin-table/admin-table.component';


@NgModule({
  declarations: [
    AdminTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
