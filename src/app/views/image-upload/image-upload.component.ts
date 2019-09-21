import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
	selector: 'app-image-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
	myForm: FormGroup;
	currentFile: File;
	dropzoneActive = false;
	// imagePath: FileList;
	imgURL: string | ArrayBuffer;
	message: string;
	categories = [];
	tags = [];

	constructor(private gallery: GalleryService, private fb: FormBuilder, private router: Router) { }

	ngOnInit() {
		this.myForm = this.fb.group({
			title: '',
			description: '',
			categories: this.fb.array([]),
			tags: this.fb.array([]),
			data: File
		});
		this.myForm.valueChanges.subscribe(console.log);
	}

	get categoryForms(): FormArray {
		return this.myForm.get('categories') as FormArray;
	}

	addCategory(): void {
		const category = this.fb.group({
			name: ''
		});
		this.categoryForms.push(category);
		console.log(this.myForm);
	}

	deleteCategory(i: number): void {
		this.categoryForms.removeAt(i);
	}

	get tagForms(): FormArray {
		return this.myForm.get('tags') as FormArray;
	}

	addTag(): void {
		const tag = this.fb.group({
			name: ''
		});
		this.tagForms.push(tag);
		console.log(this.myForm);
	}

	deleteTag(i: number): void {
		this.tagForms.removeAt(i);
	}

	/*** Dropzone ***/
	dropzoneState($event: boolean): void {
		this.dropzoneActive = $event;
	}

	// handleDrop(fileList: FileList): void {
	// 	const fileIndex = _.range(fileList.length);
	// 	_.each(fileIndex, (idx) => {
	// 		this.currentFile = fileList[idx];
	// 		/*** Image preview ***/
	// 		const mimeType = this.currentFile.type;
	// 		if (mimeType.match(/image\/*/) == null) {
	// 			this.message = 'Only images are supported.';
	// 			return;
	// 		}
	// 		const reader = new FileReader();
	// 		this.imagePath = fileList;
	// 		reader.readAsDataURL(this.currentFile);
	// 		reader.onload = (_event) => {
	// 			this.imgURL = reader.result;
	// 		};
	// 	});
	// }

	handleDrop(fileList: FileList): void {
		Array.from(fileList).forEach(file => {
			this.currentFile = file;
			this.previewImage();
		});
	}

	handleInput($event: any): void {
		this.currentFile = $event.srcElement.files[0];
		this.previewImage();
	}

	previewImage(): void {
		const mimeType = this.currentFile.type;
		if (mimeType.match(/image\/*/) == null) {
			this.message = 'Only images are supported.';
			return;
		}
		const reader = new FileReader();
		// this.imagePath = fileList;
		reader.readAsDataURL(this.currentFile);
		reader.onload = (event) => {
			this.imgURL = reader.result;
		};
	}

	// TODO: title, cats, tags
	upload(): void {
		console.log(JSON.stringify(this.myForm.value, null, 2));
		console.log(JSON.stringify(this.myForm.value.categories, null, 2));
		this.myForm.value.categories.forEach(element => {
			this.categories.push(element.name);
		});
		this.myForm.value.tags.forEach(element => {
			this.tags.push(element.name);
		});

		const fd = new FormData();
		fd.append('title', this.myForm.value.title);
		fd.append('description', this.myForm.value.description);
		fd.append('categories', this.categories.toString());
		fd.append('tags', this.tags.toString());
		fd.append('file', this.currentFile);

		this.gallery.uploadPhoto(fd).then(res => {
			if (res.ok) {
				this.router.navigate(['']);
			}
		});
	}

	log() {
		console.log('meow');
	}
}
