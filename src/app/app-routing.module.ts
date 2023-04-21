import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login-guard/login.guard';
import { AfterLoginGuard } from './guards/after-login-guard/after-login.guard';

const routes: Routes = [
{
  path:'',
  redirectTo:'session',
  pathMatch:'full',
},
{
  path:'session',
  loadChildren: () => import('./authentication/authentication.module').then((m) => m.authenticationModule),
  canActivate:[AfterLoginGuard],
},
{
  path:'home',
  component:HomeComponent,
  children:[
    {
      path:'admin',
      loadChildren:() => import('./admin/admin.module').then((m) => m.AdminModule)
    }
  ],
  canActivate: [LoginGuard],
  canLoad:[LoginGuard],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
