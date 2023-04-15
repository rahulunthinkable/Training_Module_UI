import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent {
  hide = true;
  noMatch = false;
  selected = false;
  @ViewChild('confirm') confirm !: ElementRef;

  registerForm = this.fb.group({
    userName: [null, [Validators.required, Validators.minLength(2)]],
    email: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(8)]],
    terms: [null],
  });

  constructor(private fb: FormBuilder) { }

  register() {
    this.selected = true;
    if (this.confirm.nativeElement.value != this.registerForm.controls['password'].value) {
      this.noMatch = true;
    } else {
      if (this.registerForm.valid) {
        this.noMatch = false;
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
