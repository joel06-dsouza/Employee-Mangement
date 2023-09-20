import { Component, OnInit } from '@angular/core';
import { EmployeeRestService } from '../employee/employee.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from '../employee/employee.model';
import { SharedDataService } from '../shared-data.service';
import CryptoJS from 'crypto-js';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  first_id: number;
  employeeObj: Employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private employeeRestService: EmployeeRestService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.route.params.subscribe(params => {
      this.first_id = params['id'];
    })

    console.log(localStorage.getItem('id'))
    console.log(typeof this.first_id)

    const encryptedIdFromLocalStorage = localStorage.getItem("id");
    const decryptedData = CryptoJS.AES.decrypt(encryptedIdFromLocalStorage, 'encryptionSecret');
    const id = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
    if (id.toString() === this.first_id as any) {
      // console.log("True..........")
      this.getEmployeesByQuery(this.first_id);
    } else {
      // console.log("False.........")  
      console.log(id.toString())
      console.log(typeof id.toString())
      console.log(this.first_id)
      console.log(typeof this.first_id)
      this.logout();
    }
  }

  ngOnInit(): void {
    // console.log("Starting ngOninit!!!")
    const id_ls = localStorage.getItem('id');
    console.log(typeof id_ls)
    const numericPart = id_ls.match(/\d+/);
    console.log(numericPart);
    const idNumber = parseInt(numericPart[0], 10);
    console.log(idNumber);
    this.sharedDataService.setFirstId(idNumber);
  }

  getEmployeesById(first_id: number) {
    return this.employeeRestService.getEmployeesById(first_id).subscribe((data: Employee) => {
      this.employeeObj = data;
    })
  }

  getEmployeesByQuery(first_id: number) {
    return this.employeeRestService.getEmployeesByQuery(first_id).subscribe((data: Employee) => {
      this.employeeObj = data;
      console.log(this.employeeObj[0]);
    })
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id")
    this.router.navigate(['login']);
  }

}
