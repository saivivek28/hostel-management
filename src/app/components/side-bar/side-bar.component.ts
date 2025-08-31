import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-side-bar',
  imports: [RouterModule , CommonModule],
  standalone: true,
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
navigateTo(path: string) {
  this.router.navigate([path]);
}
constructor(public router: Router) {}  
// constructor(private router: Router) {
//   }
logout(){
   this.router.navigate(['/login']);
}
// navLinks = [
//   { path: '/home', label: 'Home' },
//   { path: '/terms', label: 'Terms & Conditions' },
//   { path: '/mess', label: 'Mess' },
//   { path: '/rooms', label: 'Rooms' }
// ];

}
 