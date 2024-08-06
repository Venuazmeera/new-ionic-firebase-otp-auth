import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';

import { SignInPageRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignInPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [SignInPage, OtpComponent]
})
export class SignInPageModule {}
