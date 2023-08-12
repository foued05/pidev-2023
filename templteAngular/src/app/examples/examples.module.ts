import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyForgotPasswordComponent } from './verify-forgot-password/verify-forgot-password.component';
import { NewForgotPasswordComponent } from './new-forgot-password/new-forgot-password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        ForgotPasswordComponent,
        VerifyForgotPasswordComponent,
        NewForgotPasswordComponent
    ]
})
export class ExamplesModule { }
