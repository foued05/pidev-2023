import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/userServices/user.service';

@Component({
  selector: 'app-verify-forgot-password',
  templateUrl: './verify-forgot-password.component.html',
  styleUrls: ['./verify-forgot-password.component.scss']
})
export class VerifyForgotPasswordComponent implements OnInit {

  focus;
  focus1;
    
  code = "";
  email = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('emailForgotPassword');
  }

  submit(){
    this.userService.verifyForgotPassword(this.code).subscribe((res) => {
      if(res == true){
        this.router.navigate(['new-forgot-password']);
      }else{
        alert("code invalid");
      }
    })
  }

  sendEmail(){
    this.userService.forgotPassword(this.email).subscribe(() => {});
  }

}
