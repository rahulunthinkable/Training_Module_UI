import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/auth-service/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent {

  hide = true;
  noMatch = false;
  selected = false;
  showLabel = false;
  afterLogin = '';

  @ViewChild('confirm') confirm !: ElementRef;

  registerForm = this.fb.group({
    userName: [null, [Validators.required, Validators.minLength(2)]],
    userEmail: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
  ) { }

  register() {
    this.selected = true;
    if (this.registerForm.valid) {
      if (this.confirm.nativeElement.value != this.registerForm.controls['password'].value) {
        this.noMatch = true;
      } else {
        this.noMatch = false;
        this.api.signup(this.registerForm.value).subscribe(
          {
            next: (resp) => {
              this.afterLogin = 'Registraion is successful';
              this.showLabel = true;
              this.router.navigateByUrl('session');
            },
            error: (err) => {
              this.afterLogin = err.error.message;
              this.showLabel = true;
            }
          }
        )
      }
    }
  }

  matchPass() {
    if (this.selected) {
      if (this.confirm.nativeElement.value == this.registerForm.controls['password'].value) {
        this.noMatch = false;
      } else {
        this.noMatch = true;
      }
    }
  }
}
