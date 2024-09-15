import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import AppService from '../../../services/app.service';
import StateService from '../../../store/state';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImagePreview } from '../../../model/interfaces';
import { ProfilePhotoUploadComponent } from '../../shared/dialogs/profile-photo-upload/profile-photo-upload.component';
import { ALLOWED_FILE_FORMATS, MAX_FILE_SIZE } from '../../../utils/config';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ MatDialogModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  
  private toast = inject(HotToastService)
  private _appService = inject(AppService)
  private _stateService = inject(StateService)
  private _dialog = inject(MatDialog)
  private _fileSelect = viewChild<ElementRef>('file')
  private _file = signal<File | any>(null);
  private _filePreview = signal<ImagePreview | null>(null)

  closeNav() {
    this._appService.closeUserNav()
  }

  upload() {
    this._fileSelect()!.nativeElement.click()
  }

  resetControl() {
    this._file.set(null);
    this._fileSelect()!.nativeElement.value = ''
  }

  openPreviewModal() {
    if (this._stateService.currentState().isMobile) {
      this.closeNav()
    }

    const ref = this._dialog.open(ProfilePhotoUploadComponent, { data: { image: this._filePreview() } })
  }

  onFileChange(event: any): void {
    this._file.set(event.target.files[0]);

    if (!this._file()) {
      return;
    }

    const file = this._file();
    if (file.size > MAX_FILE_SIZE * 1024) {
      this.toast.error(`File ${file.name} exceeds the maximum size of ${MAX_FILE_SIZE} kb`);
      this.resetControl()
      return;
    }

    const allowedFileTypes = ALLOWED_FILE_FORMATS.filter(format => format !== 'application/pdf')
    if (!allowedFileTypes.includes(file.type)) {
      this.toast.error(`File ${file.name} is not a supported file type (allowed: ${allowedFileTypes.join(', ')})`);
      this.resetControl();
      return;
    }


    const reader = new FileReader();

    reader.onload = (e: any) => {
      this._filePreview.set(
        {
          url: e.target.result,
          name: this._file().name,
          size: this._file().size,
        },
      );
      this.openPreviewModal()
    };

    reader.readAsDataURL(this._file());
  }
}
