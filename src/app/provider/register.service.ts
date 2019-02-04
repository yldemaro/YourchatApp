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
    console.log(nombre);
    console.log(desc);
    console.log(categoria);
    console.log(uid);
    console.log(img);
    // Añadir la info del grupo y crearlo
    this.itemsCollection = this.afs.collection<any>(`chats/${nombre}/info`, ref => ref.orderBy('fecha', 'desc').limit(500));
    this.itemsCollection2 = this.afs.collection<any>(`users/${uid}/grupos`, ref => ref.orderBy('fecha', 'desc').limit(500));
    this.itemsCollection3 = this.afs.collection<any>(`categorias/${categoria}/grupos`, ref => ref.orderBy('fecha', 'desc').limit(500));
    this.itemsCollection6 = this.afs.collection<any>(`search/`, ref => ref.orderBy('fecha', 'desc').limit(500));
    this.agregarGrupo(nombre, desc, img);
    this.agregarTuGrupo(nombre, desc, img);
    this.agregarCategoria(nombre, img, desc);
    this.agregarBusqueda(nombre, img, desc);
  }

  agregarGrupo(nombre: any, img, desc: string) {

    const grupo: any = {
      nombre: nombre,
      url: desc,
      desc: img,
      fecha: new Date().getTime()
    };
    return this.itemsCollection.add(grupo);
  }

  agregarTuGrupo(nombre: any, img, desc: string) {

    const grupo: any = {
      nombre: nombre,
      url: desc,
      desc: img,
      fecha: new Date().getTime()
    };
    return this.itemsCollection2.add(grupo);
  }

  agregarCategoria(nombre: any, img, desc: string) {
    const grupo: any = {
      nombre: nombre,
      url: img,
      desc: desc,
      fecha: new Date().getTime()
    };
    return this.itemsCollection3.add(grupo);
  }
  agregarBusqueda(nombre: any, img, desc: string) {
    const grupo: any = {
      nombre: nombre,
      url: img,
      desc: desc,
      fecha: new Date().getTime()
    };
    return this.itemsCollection6.add(grupo);
  }



}
