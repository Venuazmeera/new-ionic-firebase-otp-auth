import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ModalOptions, ToastController } from '@ionic/angular';
import { OtpComponent } from './otp/otp.component';
import { AuthService } from '../services/auth/auth.service';
import { getAuth, signInWithPhoneNumber } from "firebase/auth";


class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form: FormGroup | any;

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }),
    });
  }

  async signIn() {
   try{
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);

    const response = await this.auth.signInWithPhoneNumber('+91' + this.form.value.phone);
    console.log(response);

    const options : ModalOptions = {
      component: OtpComponent,
      componentProps: {
        phone: this.form.value.phone
      }
    };
    const modal = this.modalCtrl.create(options);
    (await modal).present();
    const data: any = (await modal).onWillDismiss();
    console.log(data);
    }catch(e){
      console.log(e);
    }
  }

  // async signIn() {
  //   try {
  //     // Check if form is valid
  //     if (!this.form.valid) {
  //       this.form.markAllAsTouched();
  //       return;
  //     }
  
  //     // Log the form value (consider removing sensitive information)
  //     console.log('Form Value:', this.form.value);
  
  //     // Attempt to sign in with phone number
  //     const response = await this.auth.signInWithPhoneNumber('+91' + this.form.value.phone);
  //     console.log('Auth Response:', response);
  
  //     // Prepare and present OTP modal
  //     const options: ModalOptions = {
  //       component: OtpComponent,
  //       componentProps: {
  //         phone: this.form.value.phone
  //       }
  //     };
  //     const modal = await this.modalCtrl.create(options);
  //     await modal.present();
  
  //     // Handle modal dismissal
  //     const { data } = await modal.onWillDismiss();
  //     console.log('Modal Dismissed with Data:', data);
  
  //   } catch (e) {
  //     console.error('SignIn Error:', e);
  
  //     // Check if error is an instance of a specific type, if applicable
  //     if (e instanceof CustomError) {
  //       // Handle specific error
  //       this.showToast('A specific error occurred: ' + e.message, 'danger');
  //     } else {
  //       // General error handling
  //       this.showToast('An unexpected error occurred. Please try again later.', 'danger');
  //     }
  
  //     // Optionally, log error to an external service
  //     this.logErrorToService(e);
  //   }
  // }
  
  // // Helper method to show a toast message
  // private async showToast(message: string, color: string = 'primary') {
  //   const toast = await this.toastCtrl.create({
  //     message,
  //     duration: 3000,
  //     color
  //   });
  //   toast.present();
  // }
  
  // // Example method to log errors to an external service
  // private logErrorToService(error: any) {
  //   // Implement your logging logic here
  //   // For example, send the error to a remote logging server
  //   console.log('Logging error to external service:', error);
  // }
}