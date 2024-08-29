import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, collectionData, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.class';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  showLogin: boolean = true;
  checked: boolean = false;

  users$: Observable<User[]>;
  user = new User();
  allUsers: User[] = [];
  firestore: Firestore;

  constructor(firestore: Firestore) {
    const usersCollection = collection(firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;
    this.firestore = firestore;
  }


  ngOnInit(): void {
    // this.users$.subscribe((changes: any) => {
    //   console.log(changes);
    //   this.allUsers = changes;
    // });
  }


  logIn() {
    const auth = getAuth();
    // signInWithEmailAndPassword(auth, 'baust.dennis@gmail.com', 'qwertzu123')
    signInWithEmailAndPassword(auth, this.user.mail, this.user.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user);

        const userDocRef = doc(this.firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        console.log('Full user data:', userDoc.data());
        console.log(user.uid);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('Full user data:', userData);

          this.user = new User({
            firstName: userData['firstName'],
            mail: userData['mail'],
            id: user.uid
          });
        } else {
          console.error('No such user!');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error code:', errorCode);
        console.log('Error message:', errorMessage);
      });

  }
}
