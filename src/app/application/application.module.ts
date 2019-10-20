import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { ValidationErrorsModule } from '@shared/validation-errors';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { HomeComponent } from './home/home.component';
import { BarbershopRegisterComponent } from './barbershop-register/barbershop-register.component';
import { BarberRegisterComponent } from './barber-register/barber-register.component';


@NgModule({
  declarations: [ApplicationComponent, HomeComponent, BarbershopRegisterComponent, BarberRegisterComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,
    ValidationErrorsModule
  ]
})
export class ApplicationModule { }
