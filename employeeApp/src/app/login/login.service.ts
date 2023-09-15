import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root' })
export class LoginRestService {
    dbURL = "http://localhost:8080";

    constructor(private http: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    /* For Login Method Only */
    signin(loginUser: any) {
        return this.http.post(`${this.dbURL}/signin`,loginUser);
    }


}