import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  loading1 = true;

  constructor(private aut: AngularFireAuth,
    private router: Router, public _cs: ServicesService) {

    this._cs.cargarTendencias().subscribe((data) => {
      console.log(data);
      this.loading1 = false;
    });

  }

  async signOut() {
    const res = await this.aut.auth.signOut();
    console.log(res);
    this.router.navigateByUrl('/login');
  }
}
