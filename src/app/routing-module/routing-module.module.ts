import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component'
import { HomeComponent } from '../home/home.component'
import { AuthGuard } from '../_services/auth-guard';
import { AuthenticationService } from '../_services/authService';

const appRoutes =[
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
]
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
})
export class RoutingModule { }
