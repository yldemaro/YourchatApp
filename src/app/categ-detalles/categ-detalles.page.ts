import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CargaImagenesService } from '../provider/carga-imagenes.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categ-detalles',
  templateUrl: './categ-detalles.page.html',
  styleUrls: ['./categ-detalles.page.scss'],
})
export class CategDetallesPage implements OnInit {
  ruta = '';
  cat: any = [];
  loading = true;
  uid: any;
  private itemsCollection: AngularFirestoreCollection<any>;
  public grupo2: any[] = [];

  constructor(public active: ActivatedRoute, private http: HttpClient, public _cs: ServicesService, 
    private cargarInfo : CargaImagenesService, private afs: AngularFirestore ,) {

    this.uid = this._cs.uid;
    console.log(this.uid);

  }

  ngOnInit() {
    this.cargardetallesCat();

  }

  async cargardetallesCat() {

    await this.active.params.subscribe((data2: any) => {
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
