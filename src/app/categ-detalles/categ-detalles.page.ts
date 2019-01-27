import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categ-detalles',
  templateUrl: './categ-detalles.page.html',
  styleUrls: ['./categ-detalles.page.scss'],
})
export class CategDetallesPage implements OnInit {
  ruta = '';
  cat: any = [];
  loading = true;

  constructor(public active: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit() {
    this.cargardetallesCat();
  }

  async cargardetallesCat() {

    this.active.params.subscribe((data2: any) => {
      console.log(data2.nombre);
      this.ruta = data2.nombre;
    });

    await this.http.get(`http://yourchat.openode.io/categorias/${this.ruta}/grupos`).subscribe((data: any) => {
      this.loading = false;
      this.cat = data;
      console.log(this.cat);
    });
  }

}
