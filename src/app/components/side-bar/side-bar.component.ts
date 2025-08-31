import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  isCollapsed = false;
  currentRoute = '';

  constructor(
    public router: Router,
    private authService: AuthService
  ) {
    // Track current route for active state
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get userEmail() {
    const user = this.currentUser;
    return user?.email || 'User';
  }

  get userRole() {
    const user = this.currentUser;
    return user?.role || 'Student';
  }
}
 