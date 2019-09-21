import { PhotoDialogComponent } from './../../dialogs/photo-dialog/photo-dialog.component';
import { GalleryService } from './../../services/gallery.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPhoto, ICategory, ITag } from 'src/app/models';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
	photos: IPhoto[] = [];
	categories: ICategory[] = [];
	tags: ITag[] = [];
	isLoaded = false;
	selectedCategories = [];
	selectedTags = [];
	selectedPhotos: IPhoto[] = [];
	resCount = 0;
	sorting = {
		sortDate: true,
		sortIcon: 'keyboard_arrow_up'
	};
	search = '';
	sendingRequest = false;
	alertService: any;
	loading: boolean;

	constructor(private gallery: GalleryService, public dialog: MatDialog) { }

	ngOnInit() {
		this.loadPhotos();
		this.initCategories();
		this.initTags();
		this.resCount = this.photos.length;
	}

	loadPhotos(): void {
		this.gallery.getPhotos()
			.pipe(first())
			.subscribe(
				data => {
					this.photos = data;
					this.selectedPhotos = data;
					this.isLoaded = true;
					this.resCount = this.photos.length;
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}

	private initCategories(): void {
		this.gallery.getCategories().then(data => {
			this.categories = data;
		});
	}

	private initTags(): void {
		this.gallery.getTags().then(data => this.tags = data);
	}

	selectPhotosByCategories(): void {
		if (this.selectedCategories.length > 0) {
			this.selectedPhotos = [];
		} else if (this.selectedCategories.length === 0) {
			this.selectedPhotos = this.photos;
			return;
		}

		for (const cat of this.selectedCategories) {
			for (const photo of this.photos) {
				for (const photoCat of photo.categories) {
					if (cat.name === photoCat.name && !this.selectedPhotos.includes(photo)) {
						this.selectedPhotos.push(photo);
						break;
					}
				}
			}
		}
	}

	selectPhotosByTags(): void {
		if (this.selectedTags.length > 0) {
			this.selectedPhotos = [];
		} else if (this.selectedTags.length === 0) {
			this.selectedPhotos = this.photos;
			return;
		}

		for (const tag of this.selectedTags) {
			for (const photo of this.photos) {
				for (const photoTag of photo.tags) {
					if (tag.name === photoTag.name && !this.selectedPhotos.includes(photo)) {
						this.selectedPhotos.push(photo);
						break;
					}
				}
			}
		}
	}

	// async openPhoto(photoData: IPhoto): Promise<any> {
	// 	const photo = await this.gallery.getPhotoById(photoData.idImageFullSize);
	// 	return this.dialog.open(PhotoDialogComponent, {
	// 		data: photo
	// 	});
	// }

	openDialog(photoData: IPhoto) {
		this.gallery.getPhotoById(photoData.idImageFullSize)
			.then(photoFullSize => this.dialog.open(PhotoDialogComponent, {
				data: {
					photoData,
					photoFullSize
				}
			})
				.afterClosed().subscribe(() => this.loadPhotos()));
	}

	changeSortDate() {
		this.sorting.sortDate = !this.sorting.sortDate;
		if (this.sorting.sortDate) {
			return this.sorting.sortIcon = 'keyboard_arrow_up';
		} else {
			return this.sorting.sortIcon = 'keyboard_arrow_down';
		}
	}

	initSearch(e: string) {
		if (e === '') { this.selectedPhotos = this.photos; }

		// Instantly removes all not letters, not numbers, trailing spaces and 1-2 char long "words" // TODO: Don't filter lithuanian!
		this.search = e.replace(/[^a-z0-9\s]+|^[ ]+|^[a-z0-9]{1,2}[ ]/i, '').replace(/[ ]{2,}|[ ][a-z0-9]{1,2}[ ]/, ' ');

		// Checks if last word is at least 3 letters long
		if (this.search.split(' ').pop().replace(' ', '').length > 2) {
			const data = this.search.split(' ').map(el => el.toLowerCase());
			this.gallery.searchImages(data).then(res => this.selectedPhotos = res);
		}
	}
}
