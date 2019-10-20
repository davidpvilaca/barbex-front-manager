import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    ButtonModule
  ]
})
export class SharedModule { }
