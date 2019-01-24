import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';

  constructor(public afs: AngularFireAuth, public rout: Router) { }

  async login() {

    const { username, password } = this;
    console.log(username, password);
    try {
      const res = await this.afs.auth.signInWithEmailAndPassword(username, password);
      console.log(res);
      this.rout.navigateByUrl('tabs/tab1');
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/invalid-email') {
        alert('Ingreso mal el email');
      }
      if (error.code === 'auth/wrong-password') {
        alert('Ingreso mal el password');
      }
    }
  }
  async loginGmail() {
    try {
      const res = await this.afs.auth.signInWithPopup(new auth.GoogleAuthProvider());
      console.log(res);
      this.rout.navigateByUrl('tabs/tab1');
    } catch (error) {
      console.log(error);
    }
  }

  iraRegister() {
    this.rout.navigateByUrl('/register');
  }

}
