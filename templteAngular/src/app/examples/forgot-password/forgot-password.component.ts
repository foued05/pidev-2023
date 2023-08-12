import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/userServices/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  focus;
  focus1;
    
    email = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(){
    this.userService.forgotPassword(this.email).subscribe(res => {
      if(res == true){
        localStorage.setItem('emailForgotPassword', this.email);
        this.router.navigate(['verify-forgot-password']);
      }else{
        alert("Email not exist")
      }
    });
  }

}
