import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SideBarComponent, TopNavbarComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-project';
  showSidebar = true;
  showNavbar = true;

  constructor(private router: Router) {
    // Hide sidebar and navbar on login page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showSidebar = !event.url.includes('/login') && !event.url.includes('/signup');
      this.showNavbar = !event.url.includes('/login') && !event.url.includes('/signup');
    });
  }
  
}
