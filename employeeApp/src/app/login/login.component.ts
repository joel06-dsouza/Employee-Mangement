import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRestService } from './login.service';
import * as CryptoJS from 'crypto-js';
import { SharedDataService } from '../shared-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  IsAuthenticationFailed: boolean = false;
  first_id: number;
  dob_id: number;

  loginForm = new FormGroup({
    UserName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  constructor(
    private router: Router,
    private loginRestService: LoginRestService,
    private sharedDataService: SharedDataService
  ) {
    this.IsAuthenticationFailed = false;
  }

  login() {

    var logindto: any = {};
    logindto.first_name = this.loginForm.controls.UserName.value;
    logindto.dob = this.loginForm.controls.Password.value;
    console.log(logindto)
    this.loginRestService.signin(logindto).subscribe((response: object) => {
      console.log('Logged In successfully!', response);
      console.log(Object.keys(response));

      if (Object.keys(response)[0] != "token") {
        this.IsAuthenticationFailed = true;
        console.log("Employee Not Found!");
      } else {
        this.IsAuthenticationFailed = false;      // Goes to the Html file to display the error if there is any
        const id = Object.values(response)[1];
        console.log(id)
        localStorage.setItem("token", JSON.stringify(Object.values(response)[0]));
        const token = JSON.stringify(Object.values(response)[0]);

        console.log(token)
        this.sharedDataService.setToken(token)
        console.log(this.sharedDataService.getToken())

        const encryptedId = CryptoJS.AES.encrypt(JSON.stringify(id), 'encryptionSecret').toString();
        localStorage.setItem("id", encryptedId)
        this.router.navigate(['welcome', id]);
      }
    }, (error) => {
      this.IsAuthenticationFailed = true;
      window.alert("Invalid User Credentials")
      console.error('Error while Logged In!', error);
    });
  }

}
