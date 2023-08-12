import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/userServices/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  test : Date = new Date();
    focus;
    focus1;
    
    email = "";
    password = "";

    user = {
      email: "",
      password: "",
      userName: "",
      createdBy: ""
    }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  create(){
    this.user.createdBy = "foued";
    this.userService.createUser(this.user).subscribe(res => {
      this.router.navigate(['home'])
    })
  }

}
