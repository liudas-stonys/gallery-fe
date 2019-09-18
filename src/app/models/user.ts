import { IUser } from 'src/app/models/user.model';

export class User implements IUser {
	username: string;
	email: string;
	password: string;
	role: string;
	token: string;
}
