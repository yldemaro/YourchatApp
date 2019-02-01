import { Component, ViewChild, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Platform } from '@ionic/angular';
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
  archivos: FileItem[] = [];

  constructor(public _cs: ServicesService, private storage: Storage, private platform: Platform,
    private route: ActivatedRoute, private file: File, private filePath: FilePath) {

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

  selectImage() {
    this._cs.uploadFromGallery(this.imagen);
  }

}
