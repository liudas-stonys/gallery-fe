import { PhotoDialogComponent } from './../../dialogs/photo-dialog/photo-dialog.component';
import { GalleryService } from './../../services/gallery.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPhoto, ICategory, ITag } from 'src/app/models';

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

	constructor(private gallery: GalleryService, public dialog: MatDialog) { }

	ngOnInit() {
		this.loadPhotos();
		this.initCategories();
		this.initTags();
	}

	loadPhotos(): void {
		this.gallery.getPhotos()
			.then(data => {
				this.photos = data;
				this.selectedPhotos = data;
				this.isLoaded = true;
			});
	}

	private initCategories(): void {
		this.gallery.getCategories().then(data => {
			this.categories = data;
			console.log(data);
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

	async openPhoto(photoData: IPhoto): Promise<any> {
		const photo = await this.gallery.getPhotoById(photoData.idImageFullSize);
		photo.description = 'Very nais foto. Very gud!';
		console.log(photo);
		return this.dialog.open(PhotoDialogComponent, {
			data: photo
		});
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
		if (e.length > 2) {
			console.log('sending request...');
		}
	}
}
