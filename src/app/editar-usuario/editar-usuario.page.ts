import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  perfil: Object = {
    nombre: null,
    desc: null
  };
  public usuario: any = {};
  uid: string;
  url: string;

  constructor(public _cs: ServicesService, public route: ActivatedRoute , public router2: Router) {
  }

  ngOnInit() {
    this.uid = localStorage.getItem('uid');
  }

  guardar(forma: NgForm) {
    // console.log( 'Valor' , forma.value);
    this.uid = this.uid;
    console.log(this.uid);
    const nombre = forma.value.nombre;
    const desc = forma.value.desc;
    setTimeout( () => {
        this._cs.editarPerfil(nombre , desc, this.uid);
        this.router2.navigateByUrl('/yourchatApp/profile');
    }, 3000 );
  }

}
