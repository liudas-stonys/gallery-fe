import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private currentUserSubject: BehaviorSubject<IUser>;
	public currentUser: Observable<IUser>;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): IUser {
		return this.currentUserSubject.value;
	}

	login(username: string, password: string): Observable<IUser> {
		return this.http.post<any>(`http://localhost:8080/api/authenticate`, { username, password })
			.pipe(map(user => {
				console.log(user);
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('currentUser', JSON.stringify(user));
				this.currentUserSubject.next(user);
				return user;
			}));
	}

	logout() {
		// remove user from local storage and set current user to null
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}
}
