import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://127.0.0.1:8000/auth'

  constructor(
    private http: HttpClient,
    private router: Router
  )
   { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login/`, data).pipe(
      tap({
        next: (response) => {
          console.log('API Response:', response);
          
          if (response?.access) {
            try {
              localStorage.setItem('auth-token', response.access);
              // localStorage.setItem('auth-user', response.user);
              
            } catch (e) {
              console.error('Storage failed:', e);
            }
          } else {
            console.warn('No access token in response');
          }
        },
        error: (err) => {
          console.error('Login request failed:', err);
        }
      })
    );
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, payload);
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  logout(): void {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
