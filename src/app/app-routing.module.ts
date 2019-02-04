import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'categDetalles/:nombre', loadChildren: './categ-detalles/categ-detalles.module#CategDetallesPageModule' },
  { path: 'chat/:nombre', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'editarUsuario/:id', loadChildren: './editar-usuario/editar-usuario.module#EditarUsuarioPageModule' },
  { path: 'buscar', loadChildren: './buscar/buscar.module#BuscarPageModule' },
  { path: 'registraGrupos', loadChildren: './registra-grupos/registra-grupos.module#RegistraGruposPageModule' },




];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
