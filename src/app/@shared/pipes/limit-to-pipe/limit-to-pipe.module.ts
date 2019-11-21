import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimitToPipe } from './limit-to.pipe';


@NgModule({
  declarations: [LimitToPipe],
  imports: [
    CommonModule
  ],
  exports: [LimitToPipe]
})
export class LimitToPipeModule { }
