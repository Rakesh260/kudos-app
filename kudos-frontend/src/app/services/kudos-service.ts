import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KudosService {

  baseUrl = 'http://127.0.0.1:8000/auth'

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getOrganizationsData(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/organizations/`)
  }

  getUserDetails(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/user/info/`)
  }

  getUserKudos(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/kudos/received/`)
  }

  giveKudos(data: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/kudos/give/`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/`);
  }

}
