import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
   }

  ngOnInit() {
   
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;

      // Get existing user data from local storage
      const userData = localStorage.getItem(email);

      if (userData) {
        const user = JSON.parse(userData);
        user.password = newPassword;

        // Save updated user data back into local storage
        localStorage.setItem(email, JSON.stringify(user));

        console.log('Password updated successfully for:', email);
        this.router.navigateByUrl('/login');
      } else {
        console.log('User not found');
      }
    } else {
      console.log('Form is invalid');
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true }; // Return error if passwords do not match
    } else {
      return null; // Return null if passwords match
    }
  }
}
