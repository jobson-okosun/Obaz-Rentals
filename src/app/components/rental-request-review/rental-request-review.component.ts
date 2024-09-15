import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-rental-request-review',
  standalone: true,
  imports: [RouterLink, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './rental-request-review.component.html',
  styleUrl: './rental-request-review.component.css'
})
export class RentalRequestReviewComponent {
  private data = inject(MAT_DIALOG_DATA)
  private _router = inject(Router)

  constructor(public _dialogRef: MatDialogRef<RentalRequestReviewComponent>) { }
}
