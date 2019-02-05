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
  loading2 = true;
  loading3 = true;
  nogrupos = false;
  grupos: any = [];
  tendencias: any = [];

  constructor(private aut: AngularFireAuth,
    private router: Router, public _cs: ServicesService) {


    this._cs.cargarTendencias().subscribe((data2) => {
      this.loading1 = false;
      // console.log(data2);
      this.tendencias = data2;

    });

    this._cs.cargarCategorias().subscribe((data3) => {
      // console.log(data3);
      this.loading3 = false;
    });

  }

  async signOut() {
    const res = await this.aut.auth.signOut();
    console.log(res);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
