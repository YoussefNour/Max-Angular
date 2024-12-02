import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  equalValues(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password == confirmPassword) {
      return null;
    }

    return { passwordsNotEqual: true };
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: [this.equalValues] }
    ),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', [Validators.required]),
    agree: new FormControl(false, [Validators.required]),
  });

  onSubmit() {
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
