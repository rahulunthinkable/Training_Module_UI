import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class Login {

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
  });

  hide = true;

  getErrorMessage() {
    const emailControl:any = this.formGroup.get('email');
    const passwordControl:any = this.formGroup.get('password');
  
    if (emailControl.hasError('required') || passwordControl.hasError('required')) {
      return 'You must enter a value';
    }
  
    if (emailControl.hasError('email')) {
      return 'Not a valid email';
    }
    
    return '';
  }
  

  login(){
    const value = this.formGroup.value;
    console.log('value >>>>>>>>>', value);
  }
}