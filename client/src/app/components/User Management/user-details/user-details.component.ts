import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId: any;
  userDetail: any ={};
  public imageUrl = 'http://localhost:3000/public/';
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) {
    this.route.params.subscribe(params => {
			this.userId = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.userId && this.userId !== null && this.userId !== undefined) {
				this.getUserDetails(this.userId);
			}
		});
  }

  ngOnInit() {
  }

  getUserDetails(UserId){
    this.userService.getSingleUser({UserId:UserId}).subscribe((result) => {
      const rs = result;
      if (rs.settings.statusCode === 200) {
        this.userDetail = rs.data;
      } else {
        this.toastr.error(rs.settings.message);
      }
    });
  }
}
