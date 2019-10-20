import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { HomeComponent } from './home/home.component';
import { BarbershopRegisterComponent } from './barbershop-register/barbershop-register.component';
import { BarberRegisterComponent } from './barber-register/barber-register.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'barbershop-register',
        component: BarbershopRegisterComponent
      },
      {
        path: 'barber-register',
        component: BarberRegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
