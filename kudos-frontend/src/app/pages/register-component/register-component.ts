
import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KudosService } from '../../services/kudos-service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  email: string = '';
  organization: string = '';
  error: string = '';
  loading: boolean = false;
  showPassword: boolean = true;
  success: string = ''
  organizations : any
  constructor(
      private authService: AuthService,
      private router: Router,
      private snackBar: MatSnackBar,
      private kudoService: KudosService
    ) {}

  ngOnInit(){
    this.loadOrganizations()
  }

  loadOrganizations(){
    this.kudoService.getOrganizationsData().subscribe({
      next:(data)=>{
        this.organizations = data
      }
    })
  }

  registerSubmit() {
    this.error = '';
    this.success = '';

    if (!this.username || !this.password || !this.email || !this.organization) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;

    const payload = {
      username: this.username,
      password: this.password,
      email: this.email,
      organization: this.organization
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Registration successful! Please login.';
        this.username = '';
        this.password = '';
        this.email = '';
        this.organization = '';
            setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error ? JSON.stringify(err.error) : 'Registration failed';
      }
    });
  }

  hide() {
    return this.showPassword;
  }

  clickEvent(event: Event) {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

}
