import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/userServices/user.service';
import '../../../assets/css/styles.css';
@Component({
  
  selector: 'app-listBlog',
  templateUrl: './listBlog.component.html',
  styleUrls: ['./listBlog.component.css']
})
export class listBlog implements OnInit {
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
