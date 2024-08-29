import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
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
  passwordVisibile: boolean = false;
  confirmPasswordVisibile: boolean = false;

  user = new User();

  login = inject(LoginComponent);
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  constructor() { }


  showPassword() {
    this.passwordVisibile = !this.passwordVisibile;
  }


  showConfirmPassword() {
    this.confirmPasswordVisibile = !this.confirmPasswordVisibile;
  }


  async createUser() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.user.mail, this.user.password);
      const uid = userCredential.user.uid;
      const usersCollection = collection(this.firestore, 'users');
      const userDocRef = doc(usersCollection, uid);
      await setDoc(userDocRef, {
        name: this.user.name,
        mail: this.user.mail,
        id: uid
      });
      this.clearInputs();
      this.signUpSuccess();
      console.log('User created and stored in Firestore:', userCredential.user);
    } catch (error: any) {
      console.error('Error creating user:', error);
    }
  }

  // async createUser() {
  //   console.log(this.user);
  //   createUserWithEmailAndPassword(this.auth, this.user.mail, this.user.password);
  //   const usersCollection = collection(this.firestore, 'users');
  //   addDoc(usersCollection, this.user.toJSON()).then((result: any) => {
  //     console.log(result);
  //     this.clearInputs();
  //     this.signUpSuccess();
  //   })
  // }

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
    setTimeout(() => {
      this.login.showSuccess = false
    }, 1000)
  }
}
