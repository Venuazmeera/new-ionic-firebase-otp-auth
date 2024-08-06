import { Injectable } from '@angular/core';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appVerifier: any;

  constructor(
    private _fireAuth: Auth
  ) { }

  recaptcha(){
    this.appVerifier = new RecaptchaVerifier(this._fireAuth, 'sign-in-button', {
      size: 'invisible',
      'callback': (response :any) => {
        console.log(response);  
      },
      'expired-callback': () => {}
    });
  }

  async signInWithPhoneNumber(phoneNumber: any){
    try{
      if(!this.appVerifier) this.recaptcha();
      const confirmationResult = await signInWithPhoneNumber(this._fireAuth, phoneNumber, this.appVerifier);
      console.log(confirmationResult);
      return confirmationResult;
    }catch(e){
      throw(e);
    }
  }

}


