import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-rooms',
  imports: [SideBarComponent, CommonModule],
  standalone: true,
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class RoomsComponent {
  allRooms = [
  { sharing: '1 Sharing', cost: 9000, type: 'AC', image: 'https://i.pinimg.com/1200x/7e/7e/a3/7e7ea3f90c05a591316ad1bbc9e3c9e4.jpg'},
  { sharing: '2 Sharing', cost: 7000, type: 'AC', image: 'https://i.pinimg.com/1200x/81/35/93/813593c72e89fa9a2807f4f014867fd9.jpg'},
  { sharing: '3 Sharing', cost: 6500, type: 'AC', image: 'https://i.pinimg.com/736x/85/12/0c/85120cb300f4994f62d3e01f8ad4a07b.jpg' },
  { sharing: '4 Sharing', cost: 5000, type: 'AC', image: 'https://i.pinimg.com/736x/6d/75/13/6d7513aab31fd17edc4d656dfaab4337.jpg' },
  { sharing: '1 Sharing', cost: 8500, type: 'Non-AC', image: 'https://i.pinimg.com/1200x/54/b0/02/54b0026d25f1abcf2ad78ec1564dcb55.jpg' },
  { sharing: '2 Sharing', cost: 5000, type: 'Non-AC', image:'https://i.pinimg.com/1200x/24/0c/36/240c36f59b31f28702c7a36544296c4b.jpg' },
  { sharing: '3 Sharing', cost: 4500, type: 'Non-AC', image: 'https://i.pinimg.com/1200x/84/f3/e2/84f3e21aac6213147c0fc94fd6884ab1.jpg'  },
  { sharing: '4 Sharing', cost: 4500, type: 'Non-AC', image: 'https://i.pinimg.com/736x/b1/6f/79/b16f798b99239271653aaa6eca309716.jpg' },
];

getCardStyle(isAC: boolean) {
  return {
    'background-color': isAC ? '#e8f4ff' : '#e8f4ff'
  };
}
selectedRoom: any = null;

  enroll(room: any) {
    this.selectedRoom = room;
  }

  makePayment() {
    alert(`Redirecting to payment gateway for ₹${this.selectedRoom.cost}`);
    // here you can integrate Razorpay / Stripe / etc
  }
}
 