import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.css']
})
export class PractiseComponent {
  
  employees: Employee[] = [];

  addEmployee() {
    const newEmployee: Employee = {
      name: '',
      email: '',
      isEditing: true, // Start in edit mode for a new employee
    };
    this.employees.push(newEmployee);
  }

  editEmployee(index: number) {
    this.employees[index].isEditing = true;
  }

  cancelEdit(index: number) {
    this.employees[index].isEditing = false;
  }

  updateEmployee(index: number) {
    // Perform update operation here (e.g., send data to the server)
    this.employees[index].isEditing = false;
  }

  removeEmployee(index: number) {
    this.employees.splice(index, 1);
  }
}

interface Employee {
  name: string;
  email: string;
  isEditing: boolean;
}

