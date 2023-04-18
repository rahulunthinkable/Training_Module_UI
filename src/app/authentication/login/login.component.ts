import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, flatMap } from 'rxjs';
import { ApiService } from 'src/app/service/auth-service/api.service';
import { SnackService } from 'src/app/service/snack-bar/snack.service';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class Login {

  showLabel = false;
  afterLogin = '';
  spinner = false;

  toggle = new Subject();
  loginForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private snackService: SnackService,
    private spinnerService: SpinnerService,
  ) { }

  hide = true;

  login() {
    if(this.loginForm.valid) {
      this.api.login(this.loginForm.value).subscribe({
        next: (resp) => {
          this.spinnerService.loadSpinner();
          this.afterLogin = 'Login successful';
          this.showLabel = true;
          this.snackService.openSnackBar(this.afterLogin,1000);
          setTimeout( () => {
            this.spinnerService.closeSpinner();
            this.router.navigateByUrl('home');
          },1000);
        },
        error: (err) => {
          this.afterLogin = err.error.message;
          this.showLabel = true;
          if(this.afterLogin == 'userEmail must be an email') {
            this.afterLogin = "No Such Email Exists";
          }
          this.snackService.openSnackBar(this.afterLogin,2000);
        }
      })
    }
  }
}
