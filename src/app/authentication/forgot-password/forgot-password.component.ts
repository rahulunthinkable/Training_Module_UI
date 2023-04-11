import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
  });
  hide = true;


  getErrorMessage() {
    const emailControl:any = this.formGroup.get('email');
    const passwordControl:any = this.formGroup.get('password');

    if (emailControl.hasError('required')) {
      return 'You must enter a value';
    }
    
    return passwordControl.hasError('email') ? 'Not a valid email' : '';
  }
}
