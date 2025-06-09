import { HttpClient } from '@angular/common/http';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { GiveKudos } from '../give-kudos/give-kudos';

@Component({
  selector: 'app-dashboard-component',
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
    MatSelectModule,
    MatTooltipModule,
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss'
})
export class DashboardComponent {

  user: any
  users: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private kudoService: KudosService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadAllUsers();
  }

  loadUserData(){

    this.kudoService.getUserDetails().subscribe({
      next:(data)=>{
        this.user = data
      }
    })

  }

  giveKudos(){

  }

  viewKudos(){
    this.router.navigate(['/view-kudos']);
  }

  logout(){
    this.authService.logout()
  }

  loadAllUsers(): void {
    this.kudoService.getAllUsers().subscribe(res => {
      this.users = res;
    });
  }

  openGiveKudosDialog(): void {
    const dialogRef = this.dialog.open(GiveKudos, {
      width: '400px',
      panelClass: 'give-kudos-dialog-radius',

      data: { users: this.users }
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
      this.kudoService.giveKudos(result).subscribe(() => {
        this.snackBar.open('Kudos sent!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.loadUserData();
      });
    }
    });
    
  }


}
