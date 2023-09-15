import { Component, OnInit } from '@angular/core';
import { EmployeeRestService } from '../employee/employee.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from '../employee/employee.model';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  first_id : number;
  employeeObj : Employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private employeeRestService: EmployeeRestService, 
    private router: Router, 
    private sharedDataService: SharedDataService
  ) {
    this.route.params.subscribe(params => {
      this.first_id = params['id'];
      // localStorage.setItem('id', JSON.stringify(this.first_id))
    })
    // this.getEmployeesById(this.first_id);
    this.getEmployeesByQuery(this.first_id);
  }
  
  ngOnInit(): void {
    const id_ls = localStorage.getItem('id');
    console.log(typeof id_ls)
    const numericPart = id_ls.match(/\d+/);
    console.log(numericPart);
    const idNumber = parseInt(numericPart[0], 10);
    console.log(idNumber);
    this.sharedDataService.setFirstId(idNumber);
  }
  
  getEmployeesById(first_id: number) {
    return this.employeeRestService.getEmployeesById(first_id).subscribe((data : Employee) => {
      this.employeeObj = data;
    })
  }

  getEmployeesByQuery(first_id: number) {
    return this.employeeRestService.getEmployeesByQuery(first_id).subscribe((data : Employee) => {
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
