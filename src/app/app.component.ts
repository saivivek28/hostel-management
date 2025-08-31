import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@Component({
  selector: 'app-root',
  standalone: true, 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterModule,
]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  
}
