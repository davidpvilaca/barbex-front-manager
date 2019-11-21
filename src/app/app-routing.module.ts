import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '@core/guards';
import { IsUnauthenticatedGuard } from '@core/guards';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [IsUnauthenticatedGuard],
    canLoad: [IsUnauthenticatedGuard],
    canActivateChild: [IsUnauthenticatedGuard]
  },
  {
    path: 'app',
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    canActivate: [IsAuthenticatedGuard],
    canLoad: [IsAuthenticatedGuard],
    canActivateChild: [IsAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
