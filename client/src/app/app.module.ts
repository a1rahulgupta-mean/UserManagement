import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';

// Modules
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// Components
import { AppComponent } from './components/index/app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/User Management/user-list/user-list.component';
import { UserAddComponent } from './components/User Management/user-add/user-add.component';
import { UserDetailsComponent } from './components/User Management/user-details/user-details.component';
import { UserService } from './services/user/user.service';




@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		UserListComponent,
		UserAddComponent,
		UserDetailsComponent
		

	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true,
		}),
	],
	providers: [UserService],
	bootstrap: [AppComponent]
})

// enableProdMode();

export class AppModule { }
