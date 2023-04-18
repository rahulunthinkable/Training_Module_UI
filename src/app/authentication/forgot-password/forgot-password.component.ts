import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/auth-service/api.service';
import { SnackService } from 'src/app/service/snack-bar/snack.service';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  fogetForm = this.fb.group({
    userEmail: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackService: SnackService,
    private router: Router, 
    private spinnerService: SpinnerService,
  ) { }

  hide = true;

  forgetPassword() {
    this.api.forget(this.fogetForm.value).subscribe({
      next: (resp) => {
        this.spinnerService.loadSpinner();
        this.snackService.openSnackBar('Success', 1500);
        setTimeout( () => {
          this.spinnerService.closeSpinner();
          this.router.navigateByUrl('session');
        },1500);
      },
      error: (err) => {
        let errMsg = err.error.message;
        if(errMsg == "userEmail must be an email") {
          errMsg = "No Such Email Exists";
        }
        this.snackService.openSnackBar(errMsg,1000000);
      }
    });
  }
}
