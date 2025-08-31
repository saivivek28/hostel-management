import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({ 
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [SideBarComponent, CommonModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInDelay', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('1000ms 300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]   
})
export class TermsAndConditionsComponent {
    payDeposit() {
    alert('Redirecting to payment gateway...');
  }
}
