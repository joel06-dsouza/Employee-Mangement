import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, JsonpInterceptor } from "@angular/common/http";
import { Observable, catchError, retry, throwError } from "rxjs";
import { Employee } from "./employee.model";


@Injectable({ providedIn: 'root' })
export class EmployeeRestService {
    apiURL = "http://localhost:3000";
    dbURL = "http://localhost:2001";

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    /* Get All Values */
    /* For db.json */
    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiURL + '/employees').pipe(retry(1), catchError(this.handleError))
    }

    /* For mysql */
    getqueryEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.dbURL}/selectEmployee`).pipe(retry(1), catchError(this.handleError))
    }

    getEmployeesById(id): Observable<Employee> {
        return this.http.get<Employee>(this.apiURL + '/employees/' + id).pipe(retry(1), catchError(this.handleError))
    }

    getEmployeesByQuery(id): Observable<Employee> {
        return this.http.get<Employee>(this.dbURL + '/getEmployee/' + id).pipe(retry(1), catchError(this.handleError))
    }

    /* Inserting Values */
    /* For db.json */
    createEmployees(employee: any): Observable<Employee> {
        return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }

    /* For mysql */
    insertqueryEmployees(employeeData: any) {
        return this.http.post(`${this.dbURL}/insertEmployee`, employeeData);
    }

    // insertqueryEmployees(employee: any) : Observable<Employee> {
    //     return this.http.post<Employee>(this.dbURL + '/insertEmployee', JSON.stringify(employee), this.httpOptions).pipe(retry(1), catchError(this.handleError));
    // }

    /* Deleting Values */
    /* For db.json */
    deleteEmployees(id: number) {
        return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }

    /* For mysql */
    deletequeryEmployees(id: number) {
        return this.http.delete<Employee>(this.dbURL + '/deleteEmployee/' + id, this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }

    /* Updating Values */
    /* For db.json */
    updateEmployees(id: number, employee: any) {
        return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions).pipe(retry(1), catchError(this.handleError))
    }
    /* For mysql */
    updatequeryEmployees(id: number, employeeData: any) {
        return this.http.put<Employee>(this.dbURL + '/updateEmployee/' + id, JSON.stringify(employeeData), this.httpOptions).pipe(retry(1), catchError(this.handleError))
    }

    getIdByName(first_name: string): Observable<number> {
        const url = this.apiURL + `/employees?first_name=${first_name}`;
        return this.http.get<number>(url).pipe(retry(1), catchError(this.handleError));
    }

    getIdByDateofBirth(dob: string): Observable<number> {
        const url = this.apiURL + `/employees?dob=${dob}`;
        return this.http.get<number>(url).pipe(retry(1), catchError(this.handleError));
    }

    handleError(handleError: any) {
        let errorMessage = '';

        if (handleError.error instanceof ErrorEvent) {
            errorMessage = handleError.error.message;
        }
        else {
            errorMessage = `Error Code: ${handleError.status}\nMessage: ${handleError.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}