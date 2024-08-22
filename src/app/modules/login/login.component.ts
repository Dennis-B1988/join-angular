import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  showLogin: boolean = true;
  checked: boolean = false;
  backToLogin: string = 'images/back.png';
  showSuccess: boolean = false;


  constructor() { }


  signUpSuccess() {
    this.showSuccess = true;
    let interval = setInterval(() => {
      if (this.showSuccess) {
        this.showSuccess = false;
        clearInterval(interval)
      }
    }, 1000)

  }
}
