import { NgStyle } from '@angular/common';
import { Component, inject, signal, } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { FileSizePipe } from '../../../../pipes/file-size.pipe';
import { ImagePreview } from '../../../../model/interfaces';
import { ALLOWED_FILE_FORMATS, MAX_FILE_SIZE, MAX_FILES_UPLOAD } from '../../../../utils/config';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [NgStyle, FileSizePipe],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export default class MediaComponent {

  private toast = inject(HotToastService)
  // private _dataService = inject(DataService)
  // private _authService = inject(AuthService)

  files = signal<FileList | any>(null);
  uploadProgress = signal<number>(0);;
  imagePreviews = signal<ImagePreview[]>([]);
  pending = signal(false)

  uploadImages(): void {
    if (this.files() && this.files().length) {
      this.pending.set(true)
      // this._dataService.uploadFiles(Array.from(this.files), this._authService.getAuthId() || '').subscribe({
      //   next: (event: any) => {
      //     // Handle the upload progress and completion
      //     if (event.type === HttpEventType.UploadProgress) {
      //       const progress = Math.round((100 * event.loaded) / event.total!);
      //       this.uploadProgress = progress

      //     } else if (event.type === HttpEventType.Response) {
      //       this._notification.openSnackBar('Files Uploaded successfully.', 'success')
      //       this.uploadProgress = 100
      //       this.pending = false;
      //       this.resetControl()
      //     }
      //   },
      //   error: (error: any) => {
      //     this.pending = false;
      //     this.uploadProgress = 0;
      //     this._notification.openSnackBar('Error uploading files', 'error')
      //   }
      // });
    }
  }

  onFileChange(event: any): void {
    this.files.set(event.target.files);

    if (!this.files()) {
      return;
    }

    
    for (let i = 0; i < this.files().length; i++) {
      
      const file = this.files()[i];
      if (file.size > MAX_FILE_SIZE * 1024) {
        this.toast.error(`File ${file.name} exceeds the maximum size of ${MAX_FILE_SIZE} kb`);
        this.resetControl()
        return;
      }

      const allowedFileTypes = ALLOWED_FILE_FORMATS.filter(format =>  format !== 'application/pdf')
      if (!allowedFileTypes.includes(file.type)) {
        this.toast.error(`File ${file.name} is not a supported file type (allowed: ${allowedFileTypes.join(', ')})`);
        this.resetControl();
        return;
      }
    }

    if (this.imagePreviews().length + this.files().length > MAX_FILES_UPLOAD) {
      this.toast.error(`Total number of files exceeds the maximum of ${MAX_FILES_UPLOAD}`);
      this.resetControl()
      return;
    }


    for (let i = 0; i < this.files().length; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePreviews.set([
          ...this.imagePreviews(),
          {
            url: e.target.result,
            name: this.files()[i].name,
            size: this.files()[i].size,
          },
        ]);
      };

      reader.readAsDataURL(this.files()[i]);
    }


  }

  deleteFile(index: number): void {
    this.imagePreviews().splice(index, 1);


    const updatedFiles: File[] = [];
    for (let i = 0; i < this.files().length; i++) {
      if (i !== index) {
        updatedFiles.push(this.files().item(i));
      }
    }

    const updatedFileList = new DataTransfer();
    updatedFiles.forEach(file => {
      updatedFileList.items.add(file);
    });

    const fileInput = document.querySelector('#fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.files = updatedFileList.files;
    }
  }


  resetControl() {
    this.imagePreviews.set([]);
    this.files.set(null);
    if ((document.querySelector('#fileInput') as HTMLInputElement)) {
      (document.querySelector('#fileInput') as HTMLInputElement).value = ''
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.setDragAndDropStyles(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.setDragAndDropStyles(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.setDragAndDropStyles(false);

    if (event.dataTransfer?.files.length) {
      this.files.set(event.dataTransfer.files);
      this.onFileChange({ target: { files: this.files() } });
    }
  }

  setDragAndDropStyles(isDragging: boolean): void {
    const dropArea = document.querySelector('.drop-area');
    if (dropArea) {
      if (isDragging) {
        dropArea.classList.add('drag-over');
      } else {
        dropArea.classList.remove('drag-over');
      }
    }
  }
}
