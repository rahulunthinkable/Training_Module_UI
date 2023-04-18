import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/auth-service/api.service';
import { SnackService } from 'src/app/service/snack-bar/snack.service';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent {

  hide = true;
  selected = false;
  showLabel = false;
  afterSignup = '';
  spinner = false;
  passMatch = false;

  @ViewChild('confirm') confirm !: ElementRef;

  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(2)]],
    userEmail: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(6)]],
    cpassword: [null, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private snackService: SnackService,
    private spinnerService: SpinnerService,
  ) { }

  register() {
    this.selected = true;
    if(this.userNameNotNumber()) {
      this.snackService.openSnackBar('Not a valid user Name', 2500);
      return;
    }
    if (this.registerForm.valid) {
      if (this.confirm.nativeElement.value != this.registerForm.controls['password'].value) {
      } else {
        this.api.signup(this.registerForm.value).subscribe(
          {
            next: (resp) => {
              this.spinnerService.loadSpinner();
              this.afterSignup = 'Registraion is successful';
              this.showLabel = true;
              this.snackService.openSnackBar(this.afterSignup,1000);
              setTimeout(() => {
                this.spinnerService.closeSpinner();
                this.router.navigateByUrl('session');
              }, 1000)
            },
            error: (err) => {
              this.afterSignup = err.error.message;
              this.showLabel = true;
              if(this.afterSignup == 'userEmail must be an email') {
                this.afterSignup = "No Such Email Exists";
              }
              this.snackService.openSnackBar(this.afterSignup,2000);
            }
          }
        )
      }
    }
  }

  userNameNotNumber() {
    if(!isNaN(Number(this.registerForm.controls['userName'].value))) {
      return true;
    }
    return false;
  }

  matchPass() {
    this.checkMatch();
  }

  checkMatch() {
    if (this.confirm.nativeElement.value == this.registerForm.controls['password'].value) {
      this.passMatch = true;
    } else {
      this.passMatch = false;
    } 
  }
  
}
