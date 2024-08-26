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
      this.signUpSuccess();
      this.clearInputs();
    } catch (error: any) { }
  }

  clearInputs() {
    this.user.name = '';
    this.user.mail = '';
    this.user.password = '';
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
