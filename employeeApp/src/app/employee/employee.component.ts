import { Component, ElementRef, OnInit } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeRestService } from './employee.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  empObject: Employee = new Employee();

  employees: Array<Employee> = new Array<Employee>();

  myForm: FormGroup;
  employeeList: any = [];
  dataemployees: Employee[] = [];


  validation_edumessage = {
    first_name: [{ type: 'required', message: 'First Name is required' }, { type: 'pattern', message: 'Should be more than 3 letters' }],
    last_name: [{ type: 'required', message: 'Last Name is required' }, { type: 'pattern', message: 'Should be atleast 5 letters' }],
    contact: [{ type: 'required', message: 'Contact No. is required' }, { type: 'pattern', message: 'Should be of 10 digits' }],
    email: [{ type: 'required', message: 'Email is required' }, { type: 'pattern', message: 'Email not in proper format' }],
    dob: [{ type: 'required', message: 'Date Of Birth is required' }],
    address: [{ type: 'required', message: 'Address is required' }],
  };

  constructor(private employeeRestService: EmployeeRestService,
    private fb: FormBuilder,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {
    this.loadqueryEmployees();
  }

  ngOnInit(): void {
    //build FormGroup
    this.myForm = this.fb.group({
      employeedata: this.fb.array([]) // add FormArray,
    });
  }

  get formControls() {
    return this.myForm.controls;
  }

  employeedata(): FormArray {
    return this.myForm.get('employeedata') as FormArray;
  }

  newemployeedata(): FormGroup {
    return this.fb.group({
      first_name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z]{3,}$")]),
      last_name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z]{4,}$")]),
      contact: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10,10}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }

  employeecon(index) {
    this.employeeList = this.myForm.get('employeedata') as FormArray;
    const formGroup = this.employeeList.controls[index] as FormGroup;
    return formGroup;
  }

  addemployeedata() {
    this.employeedata().push(this.newemployeedata());
  }

  removeemployeedata(i: number) {
    this.employeedata().removeAt(i);
  }

  onSubmit() {
    console.log(this.myForm.value)
  }

  editEmployee(index: number) {
    this.employees[index].isEditing = true;
  }

  cancelEdit(index: number) {
    this.employees[index].isEditing = false;
  }

  clear() {
    this.empObject = new Employee();
  }

  /* Loading Employee's */

  /* Loading Employee's via mysql*/
  loadqueryEmployees() {
    return this.employeeRestService.getqueryEmployees().subscribe((data: Employee[]) => {

      this.employees = new Array<Employee>();

      console.log(typeof data)
      for (let item of data) {
        console.log(typeof item)
        let employee: Employee = new Employee();
        employee.id = item.id;
        employee.first_name = item.first_name;
        employee.last_name = item.last_name;
        employee.contact = item.contact;
        employee.email = item.email;
        // const dob = new Date(item.dob)
        // const formatdob = dob.toLocaleDateString();
        employee.dob = item.dob;
        employee.address = item.address;
        this.employees.push(employee)
        // const getToken = this.sharedDataService.getToken();
        // console.log(getToken)
        // console.log(localStorage.getItem('token'))
      }
    });
  }

  /* Selecting a particular Record either in db.json / mysql */
  select(selectedEmployees: Employee, index: number) {
    console.log("Selected !!!")
    this.empObject = Object.assign({}, selectedEmployees)
    console.log(this.empObject);

    this.employees[index].isEditing = true;
  }

  /* Insertion */
  /* Insertion within mysql*/
  insertEmployee() {
    console.log("Verifying While Inserting!!!!")
    const getToken = this.sharedDataService.getToken();
    // console.log(getToken)
    // console.log(localStorage.getItem('token'))
    if (getToken === localStorage.getItem('token')) {
      var employeedto: any = {};
      employeedto.first_name = this.empObject.first_name;
      employeedto.last_name = this.empObject.last_name;
      employeedto.contact = this.empObject.contact;
      employeedto.email = this.empObject.email;
      employeedto.dob = this.empObject.dob;
      employeedto.address = this.empObject.address;
      employeedto.isEditing = true;

      this.employeeRestService.insertqueryEmployees(employeedto).subscribe(
        (response) => {
          console.log('Employee inserted successfully', response);
        },
        (error) => {
          window.alert('Error inserting employee');
          console.error('Error inserting employee', error);
        });
      this.loadqueryEmployees();
      this.myForm.reset();
      this.clear();

    } else {
      this.router.navigate(['login'])
    }
  }

  /* Deletion */
  /* Deletion within mysql*/
  deleteEmployee(id: number) {
    // let id = this.empObject.id;
    this.employeeRestService.deletequeryEmployees(id).subscribe((data: {}) => {
      window.alert("Data Deleted Successfully!!!")
    });
    this.loadqueryEmployees();
  }

  /* Updation */
  /* Updation within mysql*/

  updateEmployees(index: number) {
    console.log("Verifying While Updating!!!!")
    const getToken = this.sharedDataService.getToken();
    console.log(getToken)
    console.log(localStorage.getItem('token'))
    
    if(getToken === localStorage.getItem('token')) {
      var employeedto: any = {};
      employeedto.id = this.employees[index].id;
      employeedto.first_name = this.employees[index].first_name;
      employeedto.last_name = this.employees[index].last_name;
      employeedto.contact = this.employees[index].contact;
      employeedto.email = this.employees[index].email;
      employeedto.dob = this.employees[index].dob;
      employeedto.address = this.employees[index].address;
  
      console.log(employeedto.id)
      console.log(employeedto)
      this.employeeRestService.updatequeryEmployees(employeedto.id, employeedto).subscribe((data: {}) => {
        window.alert("Data Updated Successfully!!!")
      });
      this.employees[index].isEditing = false;
      this.loadqueryEmployees();
      this.myForm.reset();
      this.clear();
    } else {
      this.router.navigate(['login'])
    }

  }

  hasError(typeofvalidator: string, controlname: string): boolean {
    return this.empObject
      .formCustomerGroup
      .controls[controlname]
      .hasError(typeofvalidator)
  }
}


