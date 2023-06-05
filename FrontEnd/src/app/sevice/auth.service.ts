import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Observable, of, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }
  login(data: any): Observable<any> {
    const url = 'http://localhost:3006/account/login';
    return this.http.post(url, data);
  }

}
