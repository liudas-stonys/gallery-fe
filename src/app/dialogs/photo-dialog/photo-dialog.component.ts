import { IPhoto } from './../../models/photo.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-photo-dialog',
	templateUrl: './photo-dialog.component.html',
	styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent {

	constructor(
		public dialogRef: MatDialogRef<PhotoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public photo: IPhoto
	) { }

	closeDialog(): void {
		return this.dialogRef.close();
	}
}
