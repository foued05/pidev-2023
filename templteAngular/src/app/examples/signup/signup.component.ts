import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'app/userServices/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    
    email = "";
    password = "";
    constructor(private userService: UserService, private router: Router, private jwtHelper: JwtHelperService) {
     }

    ngOnInit() {}

    login(){
        this.userService.login({
            email: this.email,
            password: this.password
        }).subscribe(res => {
            console.log(res)
            if(res.length > 0){
                localStorage.setItem('token', res);
                localStorage.setItem('mode', 'mode connection');

                const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
                localStorage.setItem('id', decodedToken.id);
                localStorage.setItem('userName', decodedToken.userName);
                localStorage.setItem('role', decodedToken.role);
                localStorage.setItem('email', decodedToken.email);

                this.userService.getUserById(decodedToken.id).subscribe(res => {
                    if(res.improved == false){
                        localStorage.setItem("improved", "no");
                        this.router.navigate(['improve-error']);
                    }else{
                        localStorage.setItem("improved", "yes");
                    }
                });

                this.router.navigate(['home']).then(() => {
                    location.reload();
                });
            }else{
                alert("Email ou Password incorrecte")
            }
        });
    }

    goToCreate(){
        this.router.navigate(['create-user'])
    }

    forgotPassword(){
        this.router.navigate(['forgot-password']);
    }
}
