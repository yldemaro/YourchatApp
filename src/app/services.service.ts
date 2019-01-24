import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth, private route: Router) {
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
    this.itemsCollection2 = this.afs.collection<any>(`tendencias/`, ref => ref.limit(500));

    return this.itemsCollection2.valueChanges().pipe(map((tendencias: any) => {
      this.tendencias = [];

      for (const tendencia of tendencias) {
        this.tendencias.unshift(tendencia);  // Aqui es donde siempre te equivocas haciendo unshift mal asi que atento
      }

      console.log(this.tendencias);
      return this.tendencias;
    }));
  }

  cargarGrupos() {
    this.itemsCollection4 = this.afs.collection<any>(`users/${this.uid}/grupos`, ref => ref.limit(50));
    return this.itemsCollection4.valueChanges().pipe(map((grupos: any[]) => {
      // console.log(this.usuario.uid);
      // console.log(grupos);

      this.grupos = [];

      for (const grupo of grupos) {
        this.grupos.unshift(grupo);
      }

      console.log(this.grupos);
      return this.grupos;
    })); // Para estar pendienete de los cambios ahora en el componente te suscribes eso
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
