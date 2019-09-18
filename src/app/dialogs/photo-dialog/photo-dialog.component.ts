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

	constructor(
		public dialogRef: MatDialogRef<PhotoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public photo: IPhoto,
		private gallery: GalleryService,
		private router: Router,
		private alertService: AlertService,
		public authService: AuthenticationService
	) { }

	closeDialog(): void {
		return this.dialogRef.close();
	}

	deletePhoto(id: number): void {
		this.gallery.deletePhoto(id)
			.pipe(first())
			.subscribe(
				resolve => {
					console.log(resolve);
					this.closeDialog();
					this.router.navigate(['gallery']);
				},
				error => {
					this.alertService.error(error);
				});
	}
}
