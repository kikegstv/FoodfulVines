import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  register(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAdmin: false
    };
    return userRef.set(userData, {
      merge: true
    });
  }
}
