import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	MatButtonModule,
	MatToolbarModule,
	MatIconModule,
	MatBadgeModule,
	MatSidenavModule,
	MatListModule,
	MatGridListModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatRadioModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatChipsModule,
	MatTooltipModule,
	MatTableModule,
	MatPaginatorModule,
	MatDialogModule,
	MatCardModule,
	MatProgressSpinnerModule,
	MatCheckboxModule
} from '@angular/material';

@NgModule({
	exports: [
		CommonModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatSidenavModule,
		MatBadgeModule,
		MatListModule,
		MatGridListModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatRadioModule,
		MatDatepickerModule,
		MatChipsModule,
		MatTooltipModule,
		MatTableModule,
		MatPaginatorModule,
		MatDialogModule,
		MatCardModule,
		MatProgressSpinnerModule,
		MatCheckboxModule,
		MatNativeDateModule
	],
	providers: [
		MatDatepickerModule,
	]
})

export class AngularMaterialModule { }
