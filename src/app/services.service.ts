import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private itemsCollection2: AngularFirestoreCollection<any>;
  private itemsCollection4: AngularFirestoreCollection<any>;
  private itemsCollection5: AngularFirestoreCollection<any>;

  public tendencias: any[] = [];
  public grupos: any[] = [];
  public categorias: any[] = [];
  uid: string;
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth,
    private route: Router, private http: HttpClient) {
    this.afAuth.authState.subscribe(user => {
      // console.log('Estado' , user );
      if (!user) {
        return;
      } else {
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.uid = user.uid;
        console.log(this.usuario);
      }
    });
  }


  cargarTendencias() {
    return this.http.get('http://yourchat.openode.io/tendencias/tendencias/grupos');
  }

  cargarGrupos() {
    return this.http.get(`http://yourchat.openode.io/users/${this.uid}/groups`);
  }

  cargarCategorias() {
    this.itemsCollection5 = this.afs.collection<any>(`categorias/categ/info`, ref => ref.limit(50));
    return this.itemsCollection5.valueChanges().pipe(map((categorias: any[]) => {
      // console.log(categorias);

      this.categorias = [];

      for (const cat of categorias) {
        this.categorias.unshift(cat);
      }

      // console.log(this.categorias);
      return this.categorias;
    }));
  }

}
