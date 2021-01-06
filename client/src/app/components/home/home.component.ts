
import { Component, OnInit, Inject } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAddComponent } from '../User Management/user-add/user-add.component';
import { UserDetailsComponent } from '../User Management/user-details/user-details.component';
import { UserListComponent } from '../User Management/user-list/user-list.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {
	active: string;
	constructor(private router: Router, private toastr: ToastrService) {
		// Detect route changes for active sidebar menu
		this.router.events.subscribe((val) => {
			this.routeChanged(val);
		});
	}

	ngOnInit() {
	}
	logOut() {
		this.toastr.success('Success', "Logged Out Successfully");
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}

	// Detect route changes for active sidebar menu
	routeChanged(val) {
		this.active = val.url;
	}
}

export const homeChildRoutes: Routes = [
	{
		path: 'list',
		component: UserListComponent
	},
	{
		path: 'list/add',
		component: UserAddComponent
	},
	{
		path: 'list/update/:id',
		component: UserAddComponent
	},
	{
		path: 'list/detail/:id',
		component: UserDetailsComponent
	}
];
