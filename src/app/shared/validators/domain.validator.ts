import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator to restrict email domain to @myhostel.com
 */
export function domainValidator(allowedDomain: string = 'myhostel.com'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate empty values, let required validator handle it
    }

    const email = control.value.toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // First check if it's a valid email format
    if (!emailPattern.test(email)) {
      return { invalidEmail: true };
    }

    // Extract domain from email
    const domain = email.split('@')[1];
    
    if (domain !== allowedDomain.toLowerCase()) {
      return { 
        invalidDomain: { 
          actualDomain: domain, 
          requiredDomain: allowedDomain 
        } 
      };
    }

    return null; // Valid domain
  };
}

/**
 * Password strength validator
 */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const password = control.value;
    const errors: ValidationErrors = {};

    // Minimum length check
    if (password.length < 8) {
      errors['minLength'] = { requiredLength: 8, actualLength: password.length };
    }

    // Must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors['requiresUppercase'] = true;
    }

    // Must contain at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      errors['requiresLowercase'] = true;
    }

    // Must contain at least one number
    if (!/\d/.test(password)) {
      errors['requiresNumber'] = true;
    }

    // Must contain at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors['requiresSpecialChar'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}

/**
 * Confirm password validator (to be used with FormGroup)
 */
export function confirmPasswordValidator(passwordField: string = 'password'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null;
    }

    const password = control.parent.get(passwordField);
    const confirmPassword = control;

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}

/**
 * Room number validator (optional field, but if provided should be valid format)
 */
export function roomNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Room number is optional
    }

    const roomNumber = control.value.toString();
    
    // Room number should be 3-4 digits (e.g., 101, 1001)
    const roomPattern = /^\d{3,4}$/;
    
    if (!roomPattern.test(roomNumber)) {
      return { invalidRoomNumber: true };
    }

    // Additional validation: room number should be between 101-9999
    const num = parseInt(roomNumber, 10);
    if (num < 101 || num > 9999) {
      return { roomNumberOutOfRange: { min: 101, max: 9999, actual: num } };
    }

    return null;
  };
}
