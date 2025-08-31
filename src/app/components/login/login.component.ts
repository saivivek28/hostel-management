import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService, LoginRequest } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
import { domainValidator } from '../../shared/validators/domain.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.isBrowser()) {
      this.loadRememberedCredentials();
    }
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, domainValidator('myhostel.com')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  private loadRememberedCredentials(): void {
    if (!this.isBrowser()) return;
    
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      try {
        const userData = JSON.parse(rememberedUser);
        this.loginForm.patchValue({
          email: userData.email,
          password: userData.password,
          rememberMe: true
        });
      } catch (error) {
        localStorage.removeItem('rememberedUser');
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.loadingService.show();

      const loginData: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      // Handle remember me
      if (this.isBrowser()) {
        if (this.loginForm.value.rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({
            email: loginData.email,
            password: loginData.password
          }));
        } else {
          localStorage.removeItem('rememberedUser');
        }
      }

      // Use demo login for development
      this.authService.demoLogin(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.loadingService.hide();
          
          // Redirect to intended page or dashboard
          let redirectUrl = '/home';
          if (this.isBrowser()) {
            redirectUrl = sessionStorage.getItem('redirectUrl') || '/home';
            sessionStorage.removeItem('redirectUrl');
          }
          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          this.isLoading = false;
          this.loadingService.hide();
          this.errorMessage = error || 'Login failed. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
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
    }
    
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      email: 'Email',
      password: 'Password'
    };
    
    return displayNames[fieldName] || fieldName;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
