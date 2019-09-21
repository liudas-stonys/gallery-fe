import { Component, OnInit, Input } from '@angular/core';
import { IPhoto } from 'src/app/models';

@Component({
  selector: 'app-photo-thumbnail',
  templateUrl: './photo-thumbnail.component.html',
  styleUrls: ['./photo-thumbnail.component.scss']
})
export class PhotoThumbnailComponent implements OnInit {

	@Input() photo: IPhoto;

	constructor() { }

	ngOnInit() {
	}
}
