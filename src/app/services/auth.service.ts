import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  appUser$: Observable<IUser>;

  constructor(
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore
  ) {
    this.appUser$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<IUser>(`appusers/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleLogin() {
    const credential = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    return this.updateUserData(credential.user);
  }

  signUpWithEmail(data: any) {
    this.afAuth
      .createUserWithEmailAndPassword(data.rut, data.password)
      .then((data) => {
        if (data.user.emailVerified) {
          this.router.navigate(['/']);
        } else {
          data.user.sendEmailVerification().then(() => {
            alert('Por favor, verifique su contraseña');
            this.afAuth.signOut();
          });
        }
      });
  }

  loginWithEmail(data: any) {
    this.afAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((data) => {
        alert('Inicio de sesión exitoso');
        this.router.navigateByUrl('/');
      });
  }

  resetPassword(email: string) {
    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          'Please revise su email, nosotros hemos enviado un email con un vinculo de reinicio de la contraseña'
        );
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('Lo sentimos, usuario no encontrado');
        }
      });
  }

  private updateUserData(user) {
    const userRef = this.db.doc(`usersProfile/${user.uid}`);
    const data = {
      name: user.displayName,
      rut: user.user,
      photoURL: user.photoURL,
    };
    return userRef.set(data, { merge: true });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
