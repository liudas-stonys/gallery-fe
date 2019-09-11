import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
	selector: 'app-upload-form',
	templateUrl: './upload-form.component.html',
	styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
	myForm: FormGroup;
	currentFile: File;
	dropzoneActive = false;
	imagePath: FileList;
	imgURL: string | ArrayBuffer;
	message: string;

	constructor(private gallery: GalleryService, private fb: FormBuilder, private router: Router) { }

	ngOnInit() {
		this.myForm = this.fb.group({
			title: '',
			categories: this.fb.array([]),
			tags: this.fb.array([])
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
	}

	deleteTag(i: number): void {
		this.categoryForms.removeAt(i);
	}

	/*** Dropzone ***/
	dropzoneState($event: boolean): void {
		this.dropzoneActive = $event;
	}

	handleDrop(fileList: FileList): void {
		const fileIndex = _.range(fileList.length);

		_.each(fileIndex, (idx) => {
			this.currentFile = fileList[idx];

			/*** Image preview ***/
			const mimeType = this.currentFile.type;
			if (mimeType.match(/image\/*/) == null) {
				this.message = 'Only images are supported.';
				return;
			}
			const reader = new FileReader();
			this.imagePath = fileList;
			reader.readAsDataURL(this.currentFile);
			reader.onload = (_event) => {
				this.imgURL = reader.result;
			};
		});
	}

	// TODO: title, cats, tags
	upload(): void {
		const fd = new FormData();
		fd.append('title', this.currentFile.name);
		fd.append('file', this.currentFile, this.currentFile.name);
		fd.append('categories', this.currentFile.name);
		fd.append('tags', this.currentFile.name);
		this.gallery.uploadPhoto(fd).then(res => {
			if (res.ok) {
				this.router.navigate(['']);
			}
		});
	}
}
