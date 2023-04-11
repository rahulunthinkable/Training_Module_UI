import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  formGroup = new FormGroup({
    password : new FormControl('', [Validators.required]),
  });

  hide = true;
  getErrorMessage() {
    const passwordControl:any = this.formGroup.get('password');

    if (passwordControl.hasError('required')) {
      return 'You must enter a value';
    }
    
    return passwordControl.hasError('email') ? 'Not a valid email' : '';
  }
}
