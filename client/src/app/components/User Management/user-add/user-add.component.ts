import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  userAddForm: FormGroup;
  userId: any;
  userData: any = {};
  categoryData: any = [];
  public imageUrl = 'http://localhost:3000/public/';
  userImage: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) {
    this.route.params.subscribe(params => {
			this.userId = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.userId && this.userId !== null && this.userId !== undefined) {
				this.getUserDetails(this.userId);
			} else {
				this.createForm(null);
			}
		});
  }
  ngOnInit() {
  }

  doRegister() {
		if (this.userId && this.userId !== null && this.userId !== undefined) {
      this.userAddForm.value.id = this.userId;
      this.updateUser();
		} else {
      this.userId = null;
      this.addUser();
    }
}

addUser(){
  this.userAddForm.value.userImage  = this.userImage;
  this.userService.addUser(this.userAddForm.value).subscribe((res: any) => {	
    if (res.settings.statusCode === 200) {
      this.toastr.success(res.settings.message, 'Success');
      this.router.navigate(['/list']);
    } else {
      this.toastr.error(res.settings.message, 'Failed');
    }
})
}
updateUser(){
  this.userAddForm.value.userImage  = this.userImage;
  this.userService.updateUser(this.userAddForm.value).subscribe((result) => {
    const rs = result;
    if (rs.settings.statusCode === 200) {
      this.router.navigate(['/list']);
      this.toastr.success("success",rs.settings.message);
    } else {
      this.toastr.error(rs.settings.message);
    }
  });
}
  getUserDetails(userId){
    this.userService.getSingleUser({UserId:userId}).subscribe((result) => {
      const rs = result;
      console.log(rs)
      if (rs.settings.statusCode === 200) {
        this.createForm(rs.data);
      } else {
        this.toastr.error(rs.settings.message);
      }
    });
  }



  createForm(data) {
    if (data === null) {
      this.userAddForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        phoneNumber: ['', [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
				email: ['', [Validators.required, ValidationService.emailValidator]],
        userImage:['']
      });
    } else {
      this.userImage = data.userImage
      this.userAddForm = this.formBuilder.group({
        firstName: [data.firstName, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        lastName: [data.lastName, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        email: [data.email, [Validators.required]],
        phoneNumber: [data.phoneNumber, [Validators.required]],
      });
    }
  }

  fileChange(e, type?) {
    let form = new FormData();
    form.append('file', e.target.files[0]);
    this.fileUpload(form, type);
  }

  fileUpload(image, type) {
      this.userService.fileUpload(image).subscribe((result) => {
      if (result.status == 1) {
        this.userImage = result.fileName 
      }
    });
  }


}

