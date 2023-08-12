import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/userServices/user.service';

@Component({
  selector: 'app-new-forgot-password',
  templateUrl: './new-forgot-password.component.html',
  styleUrls: ['./new-forgot-password.component.scss']
})
export class NewForgotPasswordComponent implements OnInit {

  focus;
  focus1;
    
  email = "";
  password1 = "";
  password2 = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('emailForgotPassword');
  }

  submit(){
    if(this.password1 == this.password2){
      this.userService.updatePasswordByEmail(this.email, this.password1).subscribe(() => {
        localStorage.removeItem('emailForgotPassword')
        this.router.navigate(['home'])
      });
    }else{
      alert("les mot de passes ne sont pas compatibles");
    }
  }

}
