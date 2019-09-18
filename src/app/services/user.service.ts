import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) { }

	getAll(): Promise<IUser[]> {
		console.log(16);
		return this.http.get<User[]>(`http://localhost:8080/api/users`).toPromise();
	}

	register(user: User): Promise<any> {
		return this.http.post(`http://localhost:8080/api/register`, user).toPromise();
	}

	delete(id: number): Promise<any> {
		return this.http.delete(`http://localhost:8080/api/users/${id}`).toPromise();
	}
}
