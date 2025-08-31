// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   imports: [SideBarComponent],
//   standalone:true,
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

// }   
// import { Component } from '@angular/core';
// import { trigger, state, style, transition, animate } from '@angular/animations';

// @Component({
//   selector: 'app-home',
//   imports: [SideBarComponent, trigger, state, style, transition, animate],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
//   animations: [
//     trigger('fadeIn', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('1s', style({ opacity: 1 }))
//       ])
//     ]),
//     trigger('fadeInDelay', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('2s 0.5s', style({ opacity: 1 }))
//       ])
//     ]),
//     trigger('slideIn', [
//       transition(':enter', [
//         style({ transform: 'translateY(20px)', opacity: 0 }),
//         animate('0.8s', style({ transform: 'translateY(0)', opacity: 1 }))
//       ])
//     ]),
//   ]
// })
// export class HomeComponent {
//   roomsCount = 120;
//   residentsCount = 230;
//   totalVisits = 0;
//   currentDate: string = '';
//   currentTime: string = '';

//   ngOnInit() {
//     this.updateDateTime();
//     this.incrementVisits();
//   }

//   updateDateTime() {
//     setInterval(() => {
//       const now = new Date();
//       this.currentDate = now.toLocaleDateString();
//       this.currentTime = now.toLocaleTimeString();
//     }, 1000);
//   }

//   incrementVisits() {
//     const visits = localStorage.getItem('visits');
//     this.totalVisits = visits ? +visits + 1 : 1;
//     localStorage.setItem('visits', this.totalVisits.toString());
//   }
// }
import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideBarComponent, CommonModule, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeInDelay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s 0.5s', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('0.8s', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
  ]
})
export class HomeComponent {
  roomsCount = 120;
  residentsCount = 230;
  totalVisits = 0;
  currentDate: string = '';
  currentTime: string = '';

  ngOnInit() {
    this.updateDateTime();
    // this.incrementVisits();
  }

  updateDateTime() {
    setInterval(() => {
      const now = new Date();
      this.currentDate = now.toLocaleDateString();
      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  }
  showContact = false;

  onClick() {
    this.showContact = true;
  }

  closePopup() {
    this.showContact = false;
  }
  
//   incrementVisits() {
//   if (typeof window !== 'undefined' && window.localStorage) {
//     const visits = localStorage.getItem('visits');
//     this.totalVisits = visits ? +visits + 1 : 1;
//     localStorage.setItem('visits', this.totalVisits.toString());
//   } else {
//     // If server side, just initialize
//     this.totalVisits = 0;
//   }
// }

}
