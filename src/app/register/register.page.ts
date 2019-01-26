import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  // Cambio de usuario por email

  email: string ;
  password: string ;
  cpassword: string ;

  constructor(public afr: AngularFireAuth, public rout: Router) { }

  // Register function

  async register() {

    const { email, password, cpassword } = this;

    // Comparacion contraseñas

    if (password !== cpassword) {
      return console.error('las contraseñas no son iguales');
    }

    try {
      const res = this.afr.auth.createUserWithEmailAndPassword(email, password);
      console.log(res);
      this.rout.navigateByUrl('/login');
    } catch (error) {
      console.log(error);
    }


  }
  // Registro con email
  async registerGmail() {

    try {
      const res = await this.afr.auth.signInWithPopup(new auth.GoogleAuthProvider());
      console.log(res);
      this.rout.navigateByUrl('/login');
    } catch (error) {
      console.log(error);
    }


  }
  goLogin() {
    this.rout.navigateByUrl('/login');
  }

}
