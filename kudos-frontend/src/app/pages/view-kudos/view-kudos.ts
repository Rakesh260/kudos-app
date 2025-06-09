

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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-kudos',
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
  templateUrl: './view-kudos.html',
  styleUrl: './view-kudos.scss'
})
export class ViewKudos {

  kudosList : any




  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private kudoService: KudosService
  ) {}

  ngOnInit() {
    this.loadUserKudosData();
  }


  loadUserKudosData(){

    this.kudoService.getUserKudos().subscribe({
      next:(data)=>{
        console.log(data.username, 'sdfdsf')
        this.kudosList = data
      }
    })

  }

  goBack() {
    this.router.navigate(['/dashboard']); 
  }
}