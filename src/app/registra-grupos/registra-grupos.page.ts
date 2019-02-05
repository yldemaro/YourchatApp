import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import * as firebase from 'firebase';
import { RegisterService } from '../provider/register.service';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-registra-grupos',
  templateUrl: './registra-grupos.page.html',
  styleUrls: ['./registra-grupos.page.scss'],
})
export class RegistraGruposPage implements OnInit {

  grupo: any = {
    nombre: null,
    desc: null,
    categoria: 'Eligue categoria',
    creador: null,
    img: null,
    fecha: null
  };
  url: any;
  private CARPETA_IMAGENES = 'grupos';

  private galleryOptions: CameraOptions = {
    quality: 50,
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 800,
    targetHeight: 800,
    correctOrientation: true
  }

  categorias: any[];

  constructor(public _cs: ServicesService, public _register: RegisterService,
    private camera: Camera, private route: Router) {
    this._cs.cargarCategorias().subscribe((data) => {
      console.log(data);
      this.categorias = data;
    });
  }

  ngOnInit() {
    console.log(this.url);
  }

  crearGrupo() {
    const uid = localStorage.getItem('uid');
    console.log(uid);
    console.log(this.grupo.nombre, this.grupo.desc, this.grupo.categoria, uid, this.url);

    if (this.url === undefined) {
      this.url = 'assets/picture.png';
    }

    this._register.crearGrupo(this.grupo.nombre, this.grupo.desc, uid, this.url);
    this._register.agregarCategoria(this.grupo.categoria, this.grupo.desc, this.url);

    this.route.navigateByUrl('/yourchatApp/grupos');
  }

  cargarImagen(data) {
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
      const storageRef = firebase.storage().ref(`${this.CARPETA_IMAGENES}/${randomNumber} + '.jpg'`);//Firebase storage main path


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
          alert('imagen cargada correctamente');

          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            const url = downloadURL;
            this.url = `${url}`;
            return this.url;
          });
        });
    });
  }

}
