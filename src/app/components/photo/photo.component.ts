import { ActivatedRoute } from '@angular/router';
import { IPhoto } from 'src/app/models/photo.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-photo',
	templateUrl: './photo.component.html',
	styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
	photo$: Observable<IPhoto>;

	// @Input() photo: IPhoto;

	constructor(private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.photo$ = this.activatedRoute.paramMap
			.pipe(() => window.history.state);

		console.log('photo: ', this.photo$);
	}
}
