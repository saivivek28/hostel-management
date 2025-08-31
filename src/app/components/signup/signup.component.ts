import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, SignupRequest } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
import { domainValidator, passwordStrengthValidator, confirmPasswordValidator, roomNumberValidator } from '../../shared/validators/domain.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, domainValidator('myhostel.com')]],
      password: ['', [Validators.required, passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator()]],
      roomNumber: ['', [roomNumberValidator()]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.loadingService.show();

      const signupData: SignupRequest = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        roomNumber: this.signupForm.value.roomNumber || undefined
      };

      // Use demo signup for development
      this.authService.demoSignup(signupData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.loadingService.hide();
          
          // Redirect to dashboard after successful signup
          const redirectUrl = sessionStorage.getItem('redirectUrl') || '/home';
          sessionStorage.removeItem('redirectUrl');
          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          this.isLoading = false;
          this.loadingService.hide();
          this.errorMessage = error || 'Signup failed. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field && field.errors && field.touched) {
      const errors = field.errors;
      
      if (errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      
      if (errors['email']) {
        return 'Please enter a valid email address';
      }
      
      if (errors['invalidDomain']) {
        return `Email must be from @${errors['invalidDomain'].requiredDomain} domain`;
      }
      
      if (errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${errors['minlength'].requiredLength} characters`;
      }
      
      if (errors['minLength']) {
        return `Password must be at least ${errors['minLength'].requiredLength} characters`;
      }
      
      if (errors['requiresUppercase']) {
        return 'Password must contain at least one uppercase letter';
      }
      
      if (errors['requiresLowercase']) {
        return 'Password must contain at least one lowercase letter';
      }
      
      if (errors['requiresNumber']) {
        return 'Password must contain at least one number';
      }
      
      if (errors['requiresSpecialChar']) {
        return 'Password must contain at least one special character';
      }
      
      if (errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
      
      if (errors['invalidRoomNumber']) {
        return 'Room number must be 3-4 digits (e.g., 101, 1001)';
      }
      
      if (errors['roomNumberOutOfRange']) {
        return `Room number must be between ${errors['roomNumberOutOfRange'].min} and ${errors['roomNumberOutOfRange'].max}`;
      }
    }
    
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      roomNumber: 'Room number',
      agreeToTerms: 'Terms agreement'
    };
    
    return displayNames[fieldName] || fieldName;
  }
}
