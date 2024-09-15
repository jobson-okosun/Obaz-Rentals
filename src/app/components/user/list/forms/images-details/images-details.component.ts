import { Component, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, } from '@angular/material/dialog';
import SelectMediaDialog from '../../../../shared/dialogs/select-media.component';

@Component({
  selector: 'app-images-details',
  standalone: true, 
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './images-details.component.html',
  styleUrl: './images-details.component.css'
})
export class ImagesDetailsComponent {
  private _matDialog = inject(MatDialog)
  private _fb = new FormBuilder()

  form = input.required<FormGroup>()

  selectMedia(index: number = 0) {
    this._matDialog.open(SelectMediaDialog, { data: {}, autoFocus: false })

    .afterClosed().subscribe((res: any) => {
      try {
        if ((res.selectedFiles as any[]).length) {
          (this.form().get('images') as FormArray).controls[index]?.setValue(res.selectedFiles[0].url)
        }
      } catch (error) { }
    })
  }

  addImageInput() {
    const control = this._fb.control(null);
    (this.form().get('images') as FormArray).push(control)
  }

  removeLastImageInput() {
    (this.form().get('images') as FormArray).controls.pop()
  }
}
