import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, LoginFormComponent, SignupFormComponent],
  providers: [LoginFormComponent, SignupFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  showLogin: boolean = true;
  checked: boolean = false;
  backToLogin: string = 'images/back.png';
  showSuccess: boolean = false;


  constructor() { }



}
