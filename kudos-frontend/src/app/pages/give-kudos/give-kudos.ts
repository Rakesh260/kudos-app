import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, signal, Inject, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-give-kudos',
  imports: [
    FormsModule,
    RouterModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './give-kudos.html',
  styleUrl: './give-kudos.scss',

})
export class GiveKudos {

  kudosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GiveKudos>,
    @Inject(MAT_DIALOG_DATA) public data: { users: any[] }
  ) 
  {
    this.kudosForm = this.fb.group({
      receiver: [null, Validators.required],
      message: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

    
  submit(): void {
    if (this.kudosForm.valid) {
      this.dialogRef.close(this.kudosForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
