import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/auth-service/api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class Login {

  showLabel = false;
  afterLogin = '';

  toggle = new Subject();
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  hide = true;

  login() {
    this.api.login(this.loginForm.value).subscribe({
      next: (resp) => {
        this.afterLogin = 'Login successful';
        this.showLabel = true;
        this.router.navigateByUrl('home');
      },
      error: (err) => {
        this.afterLogin = err.error.message;
        this.showLabel = true;
      }
    })
  }
}
