import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
   }


  signIn() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('username')?.value;
      console.log(email);
      const password = this.loginForm.get('password')?.value;

      // Retrieve user data from local storage
      const userData = localStorage.getItem(email);
      console.log(userData)
     

      if (userData) {
        const storedData = JSON.parse(userData);
        console.log(storedData);

        // Compare the stored password with the entered password
        if (storedData.password === password) {
          console.log('Login successful!'); // Access granted
        } else {
          console.log('Invalid password'); // Incorrect password
        }
      } else {
        console.log('User not found'); // User not registered
      }
    } else {
      console.log('Form is invalid'); // Form validation failed
    }
  }
}
