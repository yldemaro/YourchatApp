import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  loading1 = true;
  loading2 = true;
  loading3 = true;
  nogrupos = false;
  grupos: any = [];

  // ESTA ES LA PESTAÑA DE TUS GRUPOS

  // FALTA POR HACER :
  // COGER TODOS LOS GRUPOS DEL USUARIO  Y MOSTRARLOS , TENEMOS UNA API EN NODE QUE CON E

  constructor(public afr: AngularFireAuth, public _cs: ServicesService) {

    setInterval(() => {
      this._cs.cargarGrupos().subscribe((data: any) => {
        console.log(data.length);
        this.loading2 = false;
        this.grupos = data;
        console.log(this.grupos);
      });
    }, 3000);


    this.nogrupos = true;
  }
}
