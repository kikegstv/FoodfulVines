import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, from, map, switchMap } from 'rxjs';
import { User } from '../../features/auth/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore
    ) {}

    login(email: string, password: string): Observable<any> {
        return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
            map((response:  any) => {
                const { accessToken, uid, email } = response?.user?.multiFactor.user;
                return {
                    accessToken,
                    uid,
                    email
                };
            })
        );
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem('accessToken');
        return !!token;
      }

    logout(): Observable<any> {
        return from(this.afAuth.signOut());
    }

    register(user: User): Observable<any> {
        if (!user.email || !user.password) {
            throw new Error('Email and password are required.');
        }
        return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password))
            .pipe(
                switchMap(userCredential => {
                    if (userCredential.user) {
                        return this.setUserData(userCredential.user);
                    } else {
                        throw new Error('User data is null.');
                    }
                })
            );
    }

    setUserData(firebaseUser: firebase.User): Observable<any> {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${firebaseUser.uid}`);
        const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || '',  // Asegúrate de que displayName tiene un valor por defecto si es null
            isAdmin: false,
        };
        return from(userRef.set(userData, { merge: true }));
    }

    getUserData(uid: string): Observable<any> {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${uid}`);
        return userRef.valueChanges();
    }
}
