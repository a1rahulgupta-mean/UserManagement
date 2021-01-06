import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public totalCount: number = 0;
  allUserList: any = [];
  public imageUrl = 'http://localhost:3000/uploads/';
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAlluser();
  }

  public getAlluser() {
    this.userService.getAllUser().subscribe((result:any) => {
      console.log(result)
      if (result.settings.statusCode === 200) {
        this.allUserList = result.data.UserDetails;
      } else {
        this.toastr.error(result.settings.message);
      }
    });
  }

 

  deleteUser(userId: number) {
    const r = confirm('Are you sure?');
    if (r === true) {
      this.userService.deleteUser({ UserId: userId }).subscribe((result) => {
        const rs = result;
        if (rs.settings.statusCode === 200) {
          this.toastr.success('Success', rs.settings.message);
          this.getAlluser();
        } else {
          this.toastr.error(rs.settings.message);
        }

      })
    }
  }
}