import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { User } from '../../../core/models/user.class';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {
  showLogin: boolean = true;
  checked: boolean = false;
  backToLogin: string = 'images/back.png';
  confirmPassword: any;

  user = new User();

  login = inject(LoginComponent);
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  constructor() { }


  async createUser() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.user.mail, this.user.password);
      const uid = userCredential.user.uid;
      const userCollection = collection(this.firestore, 'users');
      await addDoc(userCollection, {
        name: this.user.name,
        mail: this.user.mail,
        id: uid
      });
      this.clearInputs();
      this.signUpSuccess();
    } catch (error: any) { }
  }

  checkFormValidation() {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.user.mail.match(validRegex) && this.user.name != '' && this.user.password != '' && this.confirmPassword == this.user.password && this.checked) {
      return true
    } else {
      return false
    }
  }


  clearInputs() {
    this.user.name = '';
    this.user.mail = '';
    this.user.password = '';
    this.confirmPassword = '';
    this.checked = false;
  }


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
