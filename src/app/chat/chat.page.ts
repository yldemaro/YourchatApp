import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public variable: string = '';
  public elemento: any;
  public mensaje: any;
  public chat: any = [];

  constructor(public _cs: ServicesService, private route: ActivatedRoute) {
    let variable = this.route.params.subscribe((data: any) => {
      this.variable = data.nombre;
    });

    this._cs.cargarMensajes(this.variable).subscribe((data) => {
      this.chat = data;
    });
  }

  ngOnInit() {
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

}
