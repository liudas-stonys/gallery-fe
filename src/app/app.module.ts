import { FileDropDirective } from './directives/file-drop.directive';
import { GalleryService } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
	MatDialogModule,
	MatCardModule,
	MatIconModule,
	MatButtonModule,
	MatSelectModule,
	MatInputModule,
	MatProgressSpinnerModule,
	MatCheckboxModule,
	MatChipsModule
} from '@angular/material';

import { ItemsCountPipe } from './pipes/items-count.pipe';
import { CiferPipe } from './pipes/cifer.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {
	MainNavComponent,
	GalleryComponent,
	PhotoComponent,
	PhotoDialogComponent,
	UploadFormComponent,
} from './components';

@NgModule({
	declarations: [
		AppComponent,
		GalleryComponent,
		PhotoComponent,
		PhotoDialogComponent,
		ItemsCountPipe,
		CiferPipe,
		UploadFormComponent,
		FileDropDirective,
		MainNavComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		FormsModule,
		MatInputModule,
		MatProgressSpinnerModule,
		FlexLayoutModule,
		LayoutModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatChipsModule
	],
	providers: [GalleryService],
	bootstrap: [AppComponent],
	entryComponents: [PhotoDialogComponent]
})
export class AppModule { }
