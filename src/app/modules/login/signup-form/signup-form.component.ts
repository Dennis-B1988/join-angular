import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {

  showLogin: boolean = true;
  checked: boolean = false;
  backToLogin: string = 'images/back.png';
  login = inject(LoginComponent)


  constructor() { }


  signUpSuccess() {
    this.login.showSuccess = true;
    let interval = setInterval(() => {
      if (this.login.showSuccess) {
        this.login.showSuccess = false;
        clearInterval(interval)
      }
    }, 1000)
  }
}
