import { Component, ViewChild, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public variable: string = '';
  public mensaje: any;
  public chat: any = [];
  public elemento: any;

  constructor(public _cs: ServicesService, private storage: Storage, private platform: Platform,
    private route: ActivatedRoute, private camera: Camera, private file: File, private filePath: FilePath) {

    let variable = this.route.params.subscribe((data: any) => {
      this.variable = data.nombre;
    });

    this._cs.cargarMensajes(this.variable).subscribe((data) => {
      setTimeout(() => {
        this.chat = data;
        this.elemento.scrollTop = this.elemento.scrollHeight;
        console.log(this.elemento.scrollHeight);
      }, 10);
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');

    setTimeout(() => {
      this.elemento.scrollTop = this.elemento.scrollHeight;
      console.log(this.elemento.scrollHeight);
    }, 2000);
  }

  enviar_mensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    } else {
      const img = false;
      this._cs.agregarMensaje(this.mensaje, img).then(() => this.mensaje = '').catch(() => console.log('Error al enviar '));
    }
  }


  async selectImage() {
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            alert(correctPath);
            alert(currentName);
            // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        alert(correctPath);
        alert(currentName);
        // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });

  }

}
