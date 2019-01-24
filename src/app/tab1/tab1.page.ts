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

  constructor(private aut: AngularFireAuth,
    private router: Router, public _cs: ServicesService) {

    setTimeout(() => {
      this.loading2 = false;
      this._cs.cargarGrupos().subscribe(() => { });
      this.nogrupos = true;
    }, 2000);

    this._cs.cargarGrupos().subscribe((data) => {
      console.log(data);
    });


    this._cs.cargarTendencias().subscribe((data2) => {
      console.log(data2);
      this.loading1 =  false;
    });

    this._cs.cargarCategorias().subscribe((data3) => {
      console.log(data3);
      this.loading3 =  false;
    });

    // this.nogrupos = true;

    // this._cs.cargarTendencias().subscribe((data) => {
    //   console.log(data);
    //   this.loading1 = false;
    // });
    // this._cs.cargarGrupos().subscribe((data2) => {
    //   console.log(data2);
    // });
    // this._cs.cargarCategorias().subscribe((data3) => {
    //   console.log(data3);
    // });

  }

  async signOut() {
    const res = await this.aut.auth.signOut();
    console.log(res);
    this.router.navigateByUrl('/login');
  }
}
