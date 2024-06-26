import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router:Router){

  }
  title = 'csvUploader';
  // upload(){
  //   this.router.navigate(['/'])
  // }
  preview(){
    this.router.navigate(['/preview'])
  }
  summary(){
    this.router.navigate(['/summary'])
  }
}
