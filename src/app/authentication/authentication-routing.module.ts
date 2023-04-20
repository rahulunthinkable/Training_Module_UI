import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { Login } from "./login/login.component";
import { SignUPComponent } from "./sign-up/sign-up.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

const routes: Routes = [
  {
    path: "",
    component: Login,
  },
  {
    path: "forget-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "sign-up",
    component: SignUPComponent,
  },
  {
    path: "change-password/:id",
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
