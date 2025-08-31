import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessComponent } from './components/mess/mess.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { TermsAndConditionsComponent } from './components/terms/terms.component';


// export const routes: Routes = [];
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    {path: 'mess', component:MessComponent},
    {path: 'terms', component:TermsAndConditionsComponent},
    { path: 'rooms', component: RoomsComponent },
  
];
