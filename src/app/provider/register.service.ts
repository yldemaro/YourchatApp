import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private CARPETA_IMAGENES = 'img';
  public url: string;
  private itemsCollection: AngularFirestoreCollection<any>;
  private itemsCollection2: AngularFirestoreCollection<any>;
  private itemsCollection3: AngularFirestoreCollection<any>;
  private itemsCollection6: AngularFirestoreCollection<any>;
  private itemsCollection5: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) { }


  crearGrupo(nombre: string, desc: string, categoria: string, uid: string, img) {
    // Añadir la info del grupo y crearlo
    this.itemsCollection = this.afs.collection<any>(`chats/${nombre}/info`, ref => ref.orderBy('fecha', 'desc').limit(500));
    this.itemsCollection2 = this.afs.collection<any>(`users/${uid}/grupos`, ref => ref.orderBy('fecha', 'desc').limit(500));
    this.itemsCollection3 = this.afs.collection<any>(`categorias/${categoria}/grupos`, ref => ref.orderBy('fecha', 'desc').limit(500));
    this.itemsCollection6 = this.afs.collection<any>(`search/`, ref => ref.orderBy('fecha', 'desc').limit(500));
    this.agregarGrupo(nombre, desc, img);
    this.agregarTuGrupo(nombre);
    this.agregarCategoria(nombre);
    this.agregarBusqueda(nombre);
  }

  agregarGrupo(nombre: any, desc: string, img) {

    const grupo: any = {
      nombre: nombre,
      url: img,
      desc: desc,
      fecha: new Date().getTime()
    };
    return this.itemsCollection.add(grupo);
  }

  agregarTuGrupo(nombre: any) {

    const grupo: any = {
      nombre: nombre,
      fecha: new Date().getTime()
    };
    return this.itemsCollection2.add(grupo);
  }

  agregarCategoria(nombre: any) {
    const grupo: any = {
      nombre: nombre,
      fecha: new Date().getTime()
    };
    return this.itemsCollection3.add(grupo);
  }
  agregarBusqueda(nombre: any) {
    const grupo: any = {
      nombre: nombre,
      fecha: new Date().getTime()
    };
    return this.itemsCollection6.add(grupo);
  }

}
