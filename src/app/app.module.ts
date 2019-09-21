import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { FileDropDirective } from './directives/file-drop.directive';
import { GalleryService } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsCountPipe } from './pipes/items-count.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import { RegisterComponent } from './views/register/register.component';
import { AngularMaterialModule } from './angular-material.module';
import { LogInComponent } from './views/log-in/log-in.component';
import { UserService } from './services/user.service';
import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './views/home/home.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ImageUploadComponent } from './views/image-upload/image-upload.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { PhotoComponent } from './components/photo/photo.component';
import { PhotoDialogComponent } from './dialogs/photo-dialog/photo-dialog.component';
import { PhotoThumbnailComponent } from './components/photo-thumbnail/photo-thumbnail.component';
import { HoverClassDirective } from './directives/hover-class.directive';

@NgModule({
	declarations: [
		AppComponent,
		GalleryComponent,
		PhotoComponent,
		PhotoDialogComponent,
		ItemsCountPipe,
		FileDropDirective,
		RegisterComponent,
		LogInComponent,
		AlertComponent,
		HomeComponent,
		ImageUploadComponent,
		PhotoThumbnailComponent,
		HoverClassDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		LayoutModule,
		AngularMaterialModule
	],
	providers: [
		GalleryService,
		UserService,
		AlertService,
		AuthenticationService,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
	],
	bootstrap: [AppComponent],
	entryComponents: [PhotoDialogComponent]
})
export class AppModule { }
