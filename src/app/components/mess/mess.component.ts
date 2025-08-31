import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-mess',
  standalone: true,
  templateUrl: './mess.component.html',
  styleUrl: './mess.component.css',
  imports: [SideBarComponent, CommonModule, RouterModule]
})
export class MessComponent {
menuItems = [
  { image: 'https://i.pinimg.com/736x/47/f5/c1/47f5c159f2cd0abe92bf0b956881476d.jpg', title: 'Monday' },
  { image: 'https://i.pinimg.com/736x/ee/c8/44/eec844ebab345f1c8f802e37bf7daf83.jpg', title: 'Tuesday' },
  { image: 'https://i.pinimg.com/736x/ee/c8/44/eec844ebab345f1c8f802e37bf7daf83.jpg', title: 'Wednesday' },
  { image: 'https://i.pinimg.com/736x/ee/c8/44/eec844ebab345f1c8f802e37bf7daf83.jpg', title: 'Thursday' },
  { image: 'https://i.pinimg.com/736x/e0/82/8b/e0828b17ac810e63ed35945967a22cac.jpg', title: 'Friday' },
  { image: 'https://i.pinimg.com/736x/5f/1a/d0/5f1ad0fa1f186f7040733e5665f93c83.jpg', title: 'Saturday' },
  { image: 'https://i.pinimg.com/736x/b0/0e/da/b00edab681de7380008fd28741614ec9.jpg', title: 'sunday' },
  // { image: 'https://i.pinimg.com/736x/4d/64/69/4d6469332c08595879ee5ceae4958882.jpg', title: 'Desserts' }
]; 
  selectedDay: string | null = null;

  menuData: any = {
    Monday: {
      Breakfast: [{ item: 'Idli', available: true,}],
      Lunch: [{ item: 'Rice & Sambar', available: true }],
      Dinner: [{ item: 'Chapati', available: false }]
    },
    Tuesday: {
      Breakfast: [{ item: 'Idli', available: true }],
      Lunch: [{ item: 'Rice & Sambar', available: true }],
      Dinner: [{ item: 'Chapati', available: false }]
    },
    Wednesday: {
      Breakfast: [{ item: 'Idli', available: true }],
      Lunch: [{ item: 'Rice & Sambar', available: true }],
      Dinner: [{ item: 'Chapati', available: false }]
    },
    Thursday: {
      Breakfast: [{ item: 'Idli', available: true }],
      Lunch: [{ item: 'Rice & Sambar', available: true }],
      Dinner: [{ item: 'Chapati', available: false }]
    },
    Friday: {
      Breakfast: [{ item: 'Idli', available: true }],
      Lunch: [{ item: 'Rice & Sambar', available: true }],
      Dinner: [{ item: 'Chapati', available: false }]
    },
    Saturday: {
      Breakfast: [{ item: 'Idli', available: true }],
      Lunch: [{ item: 'Rice & Sambar', available: true }],
      Dinner: [{ item: 'Chapati', available: false }]
    },
    Sunday: {
      Breakfast: [{ item: 'Idli', available: true }],
      Lunch: [{ item: 'Rice & Sambar', available: true }],
      Dinner: [{ item: 'Chapati', available: false }]
    },
  };

  viewAll(day: string) {
    this.selectedDay = day;
  }

  back() {
    this.selectedDay = null;
  }

}
