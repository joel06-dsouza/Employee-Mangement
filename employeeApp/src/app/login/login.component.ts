import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeeRestService } from '../employee/employee.service';
import { forkJoin, switchMap } from 'rxjs';
import { LoginRestService } from './login.service';
import CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  IsAuthenticationFailed: boolean = false;
  first_id: number;
  dob_id: number;

  dummyToken = '2a1b9e0c3f5d8h7a';

  loginForm = new FormGroup({
    UserName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  constructor(
    private router: Router,
    private employeeRestService: EmployeeRestService,
    private http: HttpClient,
    private loginRestService: LoginRestService
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
        const encryptedId = CryptoJS.AES.encrypt(JSON.stringify(id), 'encryptionSecret').toString();
        localStorage.setItem("id", encryptedId)
        this.router.navigate(['welcome', id]);
      }
    },
      (error) => {
        this.IsAuthenticationFailed = true;
        window.alert("Invalid User Credentials")
        console.error('Error while Logged In!', error);
      });
  }

}
