import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private authenticationService: AuthenticationService,
		private userService: UserService,
		private alertService: AlertService
	) {
		if (this.authenticationService.currentUserValue) {
			this.router.navigate(['/gallery']);
		}
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(4)]]
		});
	}

	get formFields() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;
		this.alertService.clear();
		if (this.registerForm.invalid) {
			return;
		}
		this.loading = true;
		this.userService.register(this.registerForm.value)
			.then(
				data => {
					console.log(data);

					this.alertService.success('Registration successful', true);
					this.router.navigate(['login']);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}
}
