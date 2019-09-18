import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPhoto, ICategory, ITag } from '../models';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class GalleryService {

	constructor(private http: HttpClient) { }

	getPhotos(): Observable<IPhoto[]> {
		return this.http.get<IPhoto[]>('http://localhost:8080/api/images');
	}

	getCategories(): Promise<ICategory[]> {
		return this.http.get<ICategory[]>('http://localhost:8080/api/images/categories').toPromise();
	}

	getTags(): Promise<ITag[]> {
		return this.http.get<ITag[]>('http://localhost:8080/api/images/tags').toPromise();
	}

	getPhotoById(id: number): Promise<IPhoto> {
		return this.http.get<IPhoto>(`http://localhost:8080/api/images/fullsize/${id}`).toPromise();
	}

	uploadPhoto(body: FormData): Promise<any> {
		return this.http.post('http://localhost:8080/api/images', body, {
			reportProgress: true,
			observe: 'events'
		}).toPromise();
	}

	searchImages(data: string[]): Promise<IPhoto[]> {
		return this.http.get<IPhoto[]>(`http://localhost:8080/api/images/search?data=${data}`).toPromise();
	}

	deletePhoto(id: number): Observable<any> {
		return this.http.delete(`http://localhost:8080/api/images/${id}`);
	}
}
