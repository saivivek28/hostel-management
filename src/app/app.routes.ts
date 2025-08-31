import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { MessComponent } from './components/mess/mess.component';
import { MessGalleryComponent } from './components/mess-gallery/mess-gallery.component';
import { TermsAndConditionsComponent } from './components/terms/terms.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AuthGuard, NoAuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  { 
    path: 'signup', 
    component: SignupComponent,
    canActivate: [NoAuthGuard]
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'mess', 
    component: MessGalleryComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'terms', 
    component: TermsAndConditionsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'rooms', 
    component: RoomsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/home' }
];
