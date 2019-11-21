import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from '@shared';
import { ValidationErrorsModule } from '@shared/validation-errors';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { HomeComponent } from './home/home.component';
import { BarbershopRegisterComponent } from './barbershop-register/barbershop-register.component';
import { BarberRegisterComponent } from './barber-register/barber-register.component';
import { BarbershopListComponent } from './barbershop-list/barbershop-list.component';
import { BarberListComponent } from './barber-list/barber-list.component';


@NgModule({
  declarations: [
    ApplicationComponent,
    HomeComponent,
    BarbershopRegisterComponent,
    BarberRegisterComponent,
    BarbershopListComponent,
    BarberListComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,
    ValidationErrorsModule,
    TableModule,
    DropdownModule
  ]
})
export class ApplicationModule { }
