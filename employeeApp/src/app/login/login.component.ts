import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeeRestService } from '../employee/employee.service';
import { forkJoin, switchMap } from 'rxjs';
import { LoginRestService } from './login.service';


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

  // login() {
  //   let username = this.loginForm.controls.UserName.value;
  //   let password = this.loginForm.controls.Password.value;
  //   console.log(username);
  //   console.log(password);

  //   this.employeeRestService.getIdByName(username).subscribe((data: any) => {
  //     const idByName = data?.[0]?.id; 
  //         // data? check if data is null or undefined -> returns undefined 
  //         // [0]? check if array is empty or not an array -> returns undefined
  //         // .id if above conditions passed then it access the `id` property -> returns id
  //     if (typeof idByName === 'number') {
  //       this.first_id = idByName;
  //       console.log("ID via First_Name - " + this.first_id);
  //     } else {
  //       console.log("Invalid or missing ID in the response", data)
  //       window.alert("Invalid or missing ID in the response");
  //       this.router.navigate(['login']);
  //     }
  //   });

  //   this.employeeRestService.getIdByDateofBirth(password).subscribe((data: any) => {
  //     const idByDOB = data?.[0]?.id; 
  //     // data? check if data is null or undefined -> returns undefined 
  //     // [0]? check if array is empty or not an array -> returns undefined
  //     // .id if above conditions passed then it access the `id` property -> returns id
  //     if (typeof idByDOB === 'number') {
  //       this.dob_id = idByDOB;
  //       console.log("ID via dob - " + this.dob_id);
  //     } else {
  //       console.log("Invalid or missing ID in the response", data);
  //       // window.alert("Invalid or missing ID in the response:");
  //       // this.router.navigate(['login'])
  //     }
  //   });

  //   console.log(this.first_id);
  //   console.log(this.dob_id);
  //   if(this.first_id === this.dob_id){
  //     this.IsAuthenticationFailed=false;
  //     // window.alert("Authenticated");
  //     this.router.navigate(['welcome']);
  //   } else {
  //     this.IsAuthenticationFailed=true;
  //     window.alert("Not Auth");
  //     this.router.navigate(['login']);
  //   }

  // }


  /* The below code is responsible for getting id and then matching if true pass to login else return error. */
  // const username = this.loginForm.controls.UserName.value;
  // const password = this.loginForm.controls.Password.value;
  // forkJoin([
  //   this.employeeRestService.getIdByName(username),
  //   this.employeeRestService.getIdByDateofBirth(password)
  // ]).subscribe(([nameData, dobData]) => {
  //   const idByName = nameData?.[0]?.id;
  //   this.first_id = idByName;
  //   const idByDOB = dobData?.[0]?.id;
  //   this.dob_id = idByDOB;
  //   // data? check if data is null or undefined -> returns undefined 
  //   // [0]? check if array is empty or not an array -> returns undefined
  //   // .id if above conditions passed then it access the `id` property -> returns id


  //   if (typeof idByName === 'number' && typeof idByDOB === 'number' && idByName === idByDOB) {
  //     // IDs match, route to another page
  //     this.IsAuthenticationFailed = false;      // Goes to the Html file to display the error if there is any
  //     localStorage.setItem("token", JSON.stringify(this.dummyToken));
  //     this.router.navigate(['welcome', idByDOB]);
  //   } else {
  //     // IDs don't match, display error
  //     this.IsAuthenticationFailed = true;       // Goes to the Html file to display the error
  //     // window.alert("Incorrect username or password");
  //   }
  // }, error => {
  //   console.error("Error occurred while fetching data", error);
  //   this.IsAuthenticationFailed = true;
  //   window.alert("An error occurred while logging in. Please try again later.");
  // });

  login() {

    var logindto: any = {};
    logindto.first_name = this.loginForm.controls.UserName.value;
    logindto.dob = this.loginForm.controls.Password.value;
    console.log(logindto)
    this.loginRestService.signin(logindto).subscribe((response: any) =>   {
        console.log('Logged In successfully!', response);
        console.log(response.id);
        if (response.id) {
          this.IsAuthenticationFailed = false;      // Goes to the Html file to display the error if there is any
          const id = response.id;
          localStorage.setItem("token", JSON.stringify(this.dummyToken));
          localStorage.setItem("id", JSON.stringify(id));
          this.router.navigate(['welcome', id]);
        } else {
          console.log("Employee Not Found!");
          this.IsAuthenticationFailed = true;      // Goes to the Html file to display the error if there is any
          window.alert("Employee Not Found!");
        }
      },
      (error) => {
        this.IsAuthenticationFailed = true;
        window.alert("Invalid User Credentials")
        console.error('Error while Logged In!', error);
      });
  }

}
