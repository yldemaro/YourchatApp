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
  public tendencias: any[] = [];
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
    //console.log(this.itemsCollection2);

    return this.itemsCollection2.valueChanges().pipe(map((tendencias: any) => {
      this.tendencias = [];

      for (const tendencia of tendencias) {
        this.tendencias.unshift(tendencia);  // Aqui es donde siempre te equivocas haciendo unshift mal asi que atento
      }

      console.log(this.tendencias);
      return this.tendencias;
    }));
  }

}
