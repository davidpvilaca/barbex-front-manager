import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorsComponent } from './validation-errors.component';



@NgModule({
  declarations: [ValidationErrorsComponent],
  imports: [
    CommonModule
  ],
  exports: [ValidationErrorsComponent]
})
export class ValidationErrorsModule { }
