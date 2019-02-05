import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';

declare var window: any;

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  perfil: Object = {
    nombre: null,
    desc: null,
    img: null
  };
  public usuario: any = {};
  uid: string;
  usu: any[];
  url: any;
  private CARPETA_IMAGENES = 'profile';

  private galleryOptions: CameraOptions = {
    quality: 50,
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 800,
    targetHeight: 800,
    correctOrientation: true
  }

  constructor(public _cs: ServicesService,
    public route: ActivatedRoute, public router2: Router, private camera: Camera) {
  }

  ngOnInit() {
    this.uid = localStorage.getItem('uid');

    this._cs.usuarioInfo().subscribe((data: any) => {
      console.log(data);
      this.usu = data;
    });
  }

  guardar(forma: NgForm) {
    // console.log( 'Valor' , forma.value);
    this.uid = this.uid;
    console.log(this.uid);
    const nombre = forma.value.nombre;
    const desc = forma.value.desc;
    console.log(nombre, desc);
    alert(this.url);
    this._cs.editarPerfil(nombre, desc, this.uid, this.url);
    this.router2.navigateByUrl('/yourchatApp/profile');
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
      const storageRef = firebase.storage().ref(`${this.CARPETA_IMAGENES}/${randomNumber} + '.jpg'`);

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
            alert(url);
            this.url = `${url}`;
            alert(this.url);
            return this.url;
          });
        });
    });
  }

}
