import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
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
export class HomeComponent implements OnInit {
  roomsCount = 120;
  residentsCount = 230;
  totalVisits = 0;
  currentDate: string = '';
  currentTime: string = '';
  showContact = false;

  ngOnInit() {
    this.updateDateTime();
    this.incrementVisits();
  }

  updateDateTime() {
    setInterval(() => {
      const now = new Date();
      this.currentDate = now.toLocaleDateString();
      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  }

  onClick() {
    this.showContact = true;
  }

  closePopup() {
    this.showContact = false;
  }
  
  incrementVisits() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const visits = localStorage.getItem('visits');
      this.totalVisits = visits ? +visits + 1 : 1;
      localStorage.setItem('visits', this.totalVisits.toString());
    } else {
      this.totalVisits = 0;
    }
  }
}
