import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/auth-service/api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class Login {
  toggle = new Subject();
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private api: ApiService) {}

  hide = true;

  login() {
    this.api.login(this.loginForm.value).subscribe({
      next: (resp) => {
        console.log(resp,'@@@@');
      }
    })
  }
}
