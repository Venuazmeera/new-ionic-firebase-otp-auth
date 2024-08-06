import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  isLoading = false;
  otp: any;
  config = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'otp-input-style'
  };

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) { }

  ngOnInit() {}

  showLoader(msg: any) {
    if(!this.isLoading) this.isLoading = true;
    return this.loadingCtrl.create({
      message: msg,
      spinner: 'bubbles'
    }).then(res => {
      res.present().then(() => {
        if(!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      })
    })
    .catch(e => {
      this.isLoading = false;
      console.log(e);
    })
  }

  hideLoader() {
    if(this.isLoading) this.isLoading = false;
    return this.loadingCtrl.dismiss()
    .then(() => console.log('dismissed'))
    .catch(e => console.log(e));
  }

  onOtpChange(event: any){
    this.otp = event;
    console.log(this.otp);
  }

  resend(){

  }

  verifyOtp(){
    
  }
}
