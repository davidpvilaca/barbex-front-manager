import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { HomeComponent } from './home/home.component';
import { BarbershopRegisterComponent } from './barbershop-register/barbershop-register.component';
import { BarberRegisterComponent } from './barber-register/barber-register.component';
import { BarbershopListComponent } from './barbershop-list/barbershop-list.component';
import { BarberListComponent } from './barber-list/barber-list.component';

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
        path: 'barbershop',
        children: [
          {
            path: '',
            redirectTo: 'list'
          },
          {
            path: 'register',
            component: BarbershopRegisterComponent
          },
          {
            path: 'list',
            component: BarbershopListComponent
          }
        ]
      },
      {
        path: 'barber',
        children: [
          {
            path: '',
            redirectTo: 'list'
          },
          {
            path: 'register/:barbershopId',
            component: BarberRegisterComponent
          },
          {
            path: 'list',
            component: BarberListComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
