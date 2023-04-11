import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
{
  path:'',
  redirectTo:'session',
  pathMatch:'full',
},
{
  path:'session',
  loadChildren: () => import('./authentication/authentication.module').then((m) => m.authenticationModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
