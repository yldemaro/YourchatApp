import { Component, ViewChild, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileItem } from '../../models/file-item';


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
  imagen: any;

  constructor(public _cs: ServicesService, private storage: Storage, private alertController: AlertController,
    private route: ActivatedRoute, private file: File, private filePath: FilePath) {

    const variable = this.route.params.subscribe((data: any) => {
      console.log(data);
      this.variable = data.nombre;
    });

    this._cs.cargarMensajes(this.variable).subscribe((data) => {
      this.chat = data;

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 100);
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');

    setTimeout(() => {
      this.elemento.scrollTop = this.elemento.scrollHeight;
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

  selectImage() {
    this._cs.uploadFromGallery(this.imagen);
  }

}
