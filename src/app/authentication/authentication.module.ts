import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OverlayModule } from "@angular/cdk/overlay";
import { CdkTreeModule } from "@angular/cdk/tree";
import { PortalModule } from "@angular/cdk/portal";
import { ReactiveFormsModule } from "@angular/forms";
import { Login } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { SignUPComponent } from "./sign-up/sign-up.component";
import { MaterialModule } from "../material/material.module";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    Login,
    ForgotPasswordComponent,
    SignUPComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    CdkTreeModule,
    OverlayModule,
    PortalModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class authenticationModule {}