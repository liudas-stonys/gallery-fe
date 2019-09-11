import { IPhoto } from 'src/app/models/photo.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-photo',
	templateUrl: './photo.component.html',
	styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

	@Input() photo: IPhoto;

	constructor() { }

	ngOnInit() {
	}

}