import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-photo-dialog',
	templateUrl: './photo-dialog.component.html',
	styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent {
	showLargeImage = false;

	constructor(
		public dialogRef: MatDialogRef<PhotoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public photo: IPhoto,
		private gallery: GalleryService,
		private alertService: AlertService,
		public authService: AuthenticationService
	) { }

	closeDialog(): void {
		this.showLargeImage = false;
		this.dialogRef.close();
	}

	deletePhoto(id: number): IPhoto[] {
		this.gallery.deletePhoto(id)
			.then(
				data => {
					this.closeDialog();
					return data; // TODO: update gallery with one call
				},
				error => {
					this.alertService.error(error);
				});
		return null;
	}

	onClick(): void {
		if (this.showLargeImage) {
			this.showLargeImage = false;
		} else {
			this.showLargeImage = true;
		}
	}
}
