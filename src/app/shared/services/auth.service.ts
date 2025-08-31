import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  roomNumber?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roomNumber?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api'; // Replace with your API URL
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Check token validity on service initialization
    this.checkTokenValidity();
  }

  /**
   * Login user with email and password
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(error => this.handleAuthError(error))
      );
  }

  /**
   * Register new user
   */
  signup(userData: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/signup`, userData)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(error => this.handleAuthError(error))
      );
  }

  /**
   * Demo login for development (remove in production)
   */
  demoLogin(credentials: LoginRequest): Observable<AuthResponse> {
    // Simulate API call delay
    return new Observable(observer => {
      setTimeout(() => {
        if (credentials.email === 'admin@myhostel.com' && credentials.password === 'admin123') {
          const mockResponse: AuthResponse = {
            user: {
              id: '1',
              email: 'admin@myhostel.com',
              firstName: 'Admin',
              lastName: 'User',
              role: 'admin'
            },
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now()
          };
          this.handleAuthSuccess(mockResponse);
          observer.next(mockResponse);
          observer.complete();
        } else {
          observer.error({ error: { message: 'Invalid credentials' } });
        }
      }, 1000);
    });
  }

  /**
   * Demo signup for development (remove in production)
   */
  demoSignup(userData: SignupRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          user: {
            id: Date.now().toString(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'student',
            roomNumber: userData.roomNumber
          },
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now()
        };
        this.handleAuthSuccess(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });
  }

  /**
   * Logout user
   */
  logout(): void {
    // Call logout API if needed
    this.clearAuthData();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Refresh access token using refresh token
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError('No refresh token available');
    }

    return this.http.post<AuthResponse>(`${this.API_URL}/auth/refresh`, { refreshToken })
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(error => {
          this.logout();
          return throwError(error);
        })
      );
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Handle authentication errors
   */
  private handleAuthError(error: any): Observable<never> {
    let errorMessage = 'An error occurred during authentication';
    
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(errorMessage);
  }

  /**
   * Clear authentication data from storage
   */
  private clearAuthData(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Get user from localStorage
   */
  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Check if there's a valid token in storage
   */
  private hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      // Basic JWT token validation (check if it's not expired)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  /**
   * Check token validity and logout if invalid
   */
  private checkTokenValidity(): void {
    if (this.getAccessToken() && !this.hasValidToken()) {
      this.logout();
    }
  }
}
