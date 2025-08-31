import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {
  showProfileDropdown = false;
  showNotifications = false;
  
  constructor(private router: Router) {}

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
    this.showNotifications = false;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showProfileDropdown = false;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  navigateToProfile() {
    // Add profile navigation logic
    this.showProfileDropdown = false;
  }

  navigateToSettings() {
    // Add settings navigation logic
    this.showProfileDropdown = false;
  }
}
