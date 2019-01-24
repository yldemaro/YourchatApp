import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  username: String = '';
  message: String = '';
  chat = [];

  constructor(public afr: AngularFireAuth) {
    this.username = this.afr.auth.currentUser.email;
  }
}
