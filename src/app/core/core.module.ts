import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatPaginatorModule } from '@angular/material/paginator';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports:[
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatGridListModule,
    MatTableModule
  ],
})
export class CoreModule { }
