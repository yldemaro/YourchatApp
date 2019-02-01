import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from './interface/mensaje.interface';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';

import * as firebase from 'firebase/app';
import 'firebase/storage';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  public info: any[] = [];
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  private itemsCollection2: AngularFirestoreCollection<any>;
  private itemsCollection3: AngularFirestoreCollection<any>;
  private itemsCollection4: AngularFirestoreCollection<any>;
  private itemsCollection5: AngularFirestoreCollection<any>;

  public tendencias: any[] = [];
  public grupos: any[] = [];
  public categorias: any[] = [];
  uid: string;
  public usuario: any = {};
  public chats: Mensaje[] = [];
  private CARPETA_IMAGENES = 'img/';


  private galleryOptions: CameraOptions = {
    quality: 50,
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 800,
    targetHeight: 800,
    correctOrientation: true
  }

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth,
    private route: Router, private http: HttpClient, public camera: Camera) {
    this.afAuth.authState.subscribe(user => {
      console.log('Estado', user);
      if (!user) {
        return;
      } else {
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.uid = user.uid;
        localStorage.setItem('uid', this.uid);
        console.log(this.uid);
      }
    });
  }


  //open the gallery and Return a promise with the image data
  uploadFromGallery(data) {
    this.camera.getPicture(this.galleryOptions).then((imagePath) => {
      return this.makeFileIntoBlob(imagePath);//convert picture to blob
    }).then((imageBlob) => {
      return this.cargarImagenesFirebase(imageBlob);//upload the blob
    }).then((_uploadSnapshot: any) => {
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });
  }


  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          const reader = new FileReader();
          reader.onloadend = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  cargarImagenesFirebase(imgBlob: any) {
    const randomNumber = Math.floor(Math.random() * 256);
    console.log('Random number : ' + randomNumber);
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref(this.CARPETA_IMAGENES + randomNumber + '.jpg');//Firebase storage main path

      const metadata: firebase.storage.UploadMetadata = {
        contentType: 'image/jpeg',
      };

      const uploadTask = storageRef.put(imgBlob, metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          // upload in progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          // upload failed
          console.log(error);
          reject(error);
        },
        () => {
          // upload success
          const img = true;
          const url = uploadTask.snapshot.downloadURL;
          alert(uploadTask.snapshot);
          resolve(uploadTask.snapshot);
          this.agregarMensaje(url, img);
        });
    });
  }



  cargarTendencias() {
    return this.http.get('http://yourchat.openode.io/tendencias/tendencias/grupos');
  }

  cargarGrupos() {
    const uid = localStorage.getItem('uid');
    console.log(this.uid);
    return this.http.get(`http://yourchat.openode.io/users/${uid}/groups`);
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

  cargarMensajes(chatid: string) {
    this.itemsCollection = this.afs.collection<Mensaje>(`chats/${chatid}/mensajes`, ref => ref.orderBy('fecha', 'desc').limit(500));
    console.log(chatid);
    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      // console.log(mensajes );
      this.chats = [];

      for (const mensaje of mensajes) {
        this.chats.unshift(mensaje);
      }

      return this.chats;
    })); // Para estar pendienete de los cambios ahora en el componente te suscribes eso
  }

  agregarMensaje(texto: any, img) {

    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
      img: img
    };
    return this.itemsCollection.add(mensaje);

  }

  usuarioInfo() {
    const uid = localStorage.getItem('uid');
    this.itemsCollection3 = this.afs.collection<any>(`users/${uid}/info/`, ref => ref.orderBy('fecha', 'desc').limit(1));
    console.log(this.info);
    return this.itemsCollection3.valueChanges().pipe(map((info: any[]) => {
      console.log(info);
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));

  }

  editarPerfil(nombre: string, desc: string, uid: string) {
    this.itemsCollection4 = this.afs.collection<any>(`users/${uid}/info`);
    this.deleteDoc(uid);
    const info: any = {
      name: nombre,
      desc: desc,
      fecha: new Date().getTime(),
    };
    return this.itemsCollection4.add(info);
  }

  deleteDoc(uid: string) {
    this.afs.collection(`users/${uid}/info`,
      ref => ref.orderBy('order')).valueChanges().subscribe(deletee => {
        deletee.map((deleteee: any) => {
          this.afs.doc(`users/${uid}/info`).delete()
            .catch(error => { console.log(error); })
            .then(() => console.log(`Deleting question`));
        });
      });
  }

}
