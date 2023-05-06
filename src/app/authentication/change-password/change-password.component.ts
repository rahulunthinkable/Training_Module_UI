import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageToken } from "src/app/localstorage.token";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import {
  BackEndErrorMessages,
  BackEndResponse,
} from "src/app/utils/back-end-error-messages";
import { InternalRoutes } from "src/app/utils/internal-routes";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { SuccessMessages } from "src/app/utils/success-messages";
import { Storage_variables } from "src/app/utils/local-storage-variable";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent {
  hide = true;
  afterSignup = "";
  spinner = false;
  passMatch = false;
  userId:any;

  @ViewChild("confirm") confirm!: ElementRef;

  changeForm = this.formBuilder.group({
    password: [null, [Validators.required, Validators.minLength(6)]],
    confirm_password: [null, [Validators.required]],
  });

  constructor(
    @Inject(LocalStorageToken) private localstorage: Storage,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackService: SnackService,
    private spinnerService: SpinnerService,
    private translateService: TranslateService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(){
    this.route.params.subscribe((param:any)=>{
      if(param.id){
        this.userId=param.id
      }
      
    })
    
  }

  changePassword() {
    if (this.changeForm.valid) {
      this.spinnerService.loadSpinner();      
      this.apiService.change_password(this.changeForm.value,this.userId).subscribe({
        next: (resp) => {
          this.afterSignup = SuccessMessages.FORGET_SUCCESS;
          this.snackService.successSnackBar(this.afterSignup)
          this.spinnerService.closeSpinner();
          this.router.navigateByUrl(InternalRoutes.LOGIN_PAGE);
          this.localstorage.removeItem(Storage_variables._id);
        },
        error: (err) => {
          this.spinnerService.closeSpinner();
          this.afterSignup = err.error.message;
          if (this.afterSignup == BackEndErrorMessages.SERVER_ERROR) {
            this.afterSignup = BackEndResponse.SERVER_ERROR;
          }
          this.snackService.errorSnackBar(this.afterSignup)
        },
      });
    }
  }

  matchPass() {
    if (
      this.changeForm.controls["confirm_password"].value ==
      this.changeForm.controls["password"].value
    ) {
      this.passMatch = true;
    } else {
      this.passMatch = false;
    }
  }
}
