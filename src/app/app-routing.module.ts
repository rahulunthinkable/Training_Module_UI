import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';
const routes: Routes = [
{
  path:'',
  redirectTo:'session',
  pathMatch:'full',
},
{
  path:'session',
  loadChildren: () => import('./authentication/authentication.module').then((m) => m.authenticationModule)
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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
