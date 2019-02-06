import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {ActivatedRoute} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class CargaImagenesService {


	constructor( private afs: AngularFirestore , public afAuth: AngularFireAuth , private route: ActivatedRoute) { }



}
