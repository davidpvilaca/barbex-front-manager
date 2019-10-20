import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from '@shared';
import { ValidationErrorsModule } from '@shared/validation-errors';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    InputTextModule,
    ButtonModule,
    ValidationErrorsModule
  ]
})
export class AuthModule { }
