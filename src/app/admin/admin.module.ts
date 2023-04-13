import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    AdminTableComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
