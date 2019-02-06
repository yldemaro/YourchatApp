import { Component, OnInit } from '@angular/core';
import { Observable, Subject, ReplaySubject , combineLatest , timer} from 'rxjs';
import { BuscarService } from '../provider/buscar.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ServicesService } from '../services.service';

@Component({
	selector: 'app-buscar',
	templateUrl: './buscar.page.html',
	styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

	public loading1  = true;

	searchterm: string;

	startAt = new Subject();
	endAt = new Subject();

	clubs;
	allclubs;
	tendencias:any=[];

	startobs = this.startAt.asObservable();
	endobs = this.endAt.asObservable();

	constructor(private buscarService: BuscarService, private afs: AngularFirestore, public _cs: ServicesService) { 
		this._cs.cargarTendencias().subscribe( (data) => {
			this.loading1 =  false;
			this.tendencias=data;
		} );
	}

	ngOnInit() {
		this.getallclubs().subscribe((clubs) => {
			
			this.allclubs = clubs;
		});
		combineLatest(this.startobs, this.endobs).subscribe((value) => {
			this.firequery(value[0], value[1]).subscribe((clubs) => {
				this.clubs = clubs;
			});
		});
	}

	search($event) {
		const q = $event.target.value;
		if (q !== '') {
			this.startAt.next(q);
			this.endAt.next(q + '\uf8ff');
		} else {
			this.clubs = this.allclubs;
			console.log(this.clubs);
		}
	}
	firequery(start, end) {
		return this.afs.collection('search', ref => ref.limit(4).orderBy('nombre').startAt(start).endAt(end)).valueChanges();
	}

	getallclubs() {
		return this.afs.collection('search', ref => ref.orderBy('nombre')).valueChanges();
	}

}
