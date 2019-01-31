import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  uid: string;
  loading = true;
  ruta: String = 'Profile';
  usu: any;
  noperfil: any;

  constructor(private active: ActivatedRoute,
    public _us: ServicesService) {
    this.uid = localStorage.getItem('uid');
    this._us.usuarioInfo().subscribe((data: any) => {
      this.loading = false;
      console.log(data);
      this.usu = data;
      this.noperfil = this.usu.length;
    });

  }



}
