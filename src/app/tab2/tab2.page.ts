import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  username: String = '';
  message: String = '';
  chat = [];

  // ESTA ES LA PESTAÑA DE TUS GRUPOS

  // FALTA POR HACER :
  // COGER TODOS LOS GRUPOS DEL USUARIO  Y MOSTRARLOS , TENEMOS UNA API EN NODE QUE CON EL
  // UID TE COGE TODOS LOS GRUPOS EN LOS QUE ESTA , POR AHORA NO HAGAS NADA EN ESTA PESTAÑA
  // DE ESTO ME ENCARGO YO


  constructor(public afr: AngularFireAuth) {
    this.username = this.afr.auth.currentUser.email;
  }
}
