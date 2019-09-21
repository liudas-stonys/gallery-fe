import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-photo-dialog',
	templateUrl: './photo-dialog.component.html',
	styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent {
	showLargeImage = false;
	base64data: string;

	constructor(
		public dialogRef: MatDialogRef<PhotoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private gallery: GalleryService,
		private alertService: AlertService,
		public authService: AuthenticationService,
		private router: Router,
		private sanitize: DomSanitizer
	) {
		this.base64data = window.btoa(data.photoFullSize.data);
		console.log(data);
	}

	closeDialog(): void {
		this.showLargeImage = false;
		this.dialogRef.close();
	}

	// sanitizeBase64(mime: string, data: string): SafeUrl {
	// 	return this.sanitize.bypassSecurityTrustUrl('data:' + mime + '; base64,' + data);
	// }

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

	openPhoto(photo: IPhoto): void {
		const newTab = window.open();
		// tslint:disable-next-line: max-line-length
		newTab.document.write(`<body style="background: #111"><img src="data:${photo.mime};base64,${photo.data}"  style="display: block; margin: auto"></body>`);

		// window.open(`data:${photo.mime};base64,${this.base64data}`);
		// this.router.navigate(['photo', this.photo]);
		// this.router.navigateByUrl('/photo', { state: photo });
	}

	test(el: any) {
		const newTab = window.open();
		console.log(el.photo);
		setTimeout(() => {
			newTab.document.body.innerHTML = el.photo;
		}, 500);
		return false;
	}
}
