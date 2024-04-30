import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', Validators.required], // Set default value to 'male'
      otherGender: [''] // Initialize otherGender field
    });
  }

  ngOnInit() {
  }

  signUp() {
    if (this.signUpForm.valid) {
      const userData = {
        username: this.signUpForm.get('username')?.value,
        password: this.signUpForm.get('password')?.value,
        email: this.signUpForm.get('email')?.value,
        gender: this.signUpForm.get('gender')?.value,
        otherGender: this.isOtherSelected() ? this.signUpForm.get('otherGender')?.value : ''
      };

      // Proceed with sign-up logic
      localStorage.setItem(userData.email, JSON.stringify(userData));
      console.log('Form submitted successfully!');
    } else {
      // Handle form errors
      console.log('Form is invalid');
    }
  }

  isOtherSelected(): boolean {
    return this.signUpForm.get('gender')?.value === 'other';
  }
}
