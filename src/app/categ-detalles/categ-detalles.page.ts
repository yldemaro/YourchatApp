import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categ-detalles',
  templateUrl: './categ-detalles.page.html',
  styleUrls: ['./categ-detalles.page.scss'],
})
export class CategDetallesPage implements OnInit {

  cat: any ;

  constructor(public active: ActivatedRoute, private http: HttpClient) {

  }

  async ngOnInit() {
    await this.cargardetallesCat();
  }

  async cargardetallesCat() {

    // // let nombre = this.active.params._value.nombre;
    // // console.log(nombre);
    // this.http.get(`http://yourchat.openode.io/categorias/${nombre}/grupos`).subscribe((data: any) => {
    //   this.cat = data;
    // });
  }

}
