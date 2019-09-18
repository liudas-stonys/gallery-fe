import { LogInComponent } from './views/log-in/log-in.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ImageUploadComponent } from './views/image-upload/image-upload.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
	{ path: '', component: GalleryComponent },
	{ path: 'gallery', component: GalleryComponent },
	{ path: 'login', component: LogInComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'image-upload', component: ImageUploadComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
