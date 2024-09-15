import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RentalRequestReviewComponent } from '../../../rental-request-review/rental-request-review.component';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-profile-photo-upload',
  standalone: true,
  imports: [MatDialogContent, MatButtonModule, MatDialogActions, MatDialogActions, MatDialogClose],
  templateUrl: './profile-photo-upload.component.html',
  styleUrl: './profile-photo-upload.component.css'
})
export class ProfilePhotoUploadComponent {
  public data = inject(MAT_DIALOG_DATA)
  private _router = inject(Router)

  constructor(public _dialogRef: MatDialogRef<RentalRequestReviewComponent>) { }


}
