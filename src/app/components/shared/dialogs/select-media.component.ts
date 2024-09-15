import { Component, ElementRef, Inject, inject, OnInit, signal, viewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { PAGINATION_LIMITS } from "../../../utils/config";
import { loadData } from "../../../utils/helper";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
 
@Component({
    standalone: true,
    template: `
        @if(files().length) {
            <h2 mat-dialog-title>Select media</h2>
        }
        <mat-dialog-content>
            @if(files().length) {

                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
                    @for(item of $any(dataSource).data; track item.url; let i = $index) {
                        <div class="overflow-hidden rounded-md relative border hover:border-gray-300 hover:drop-shadow transition duration-200 ease-in-out">
                            <img [src]="item.url" alt="Image" class="w-full h-20 lg:h-28 object-cover">
                            <span  class=" cursor-pointer p-2 absolute inset-0 rounded-full h-8 w-8 transition hover:bg-gray-200 duration-300 flex items-center justify-center">
                                <input (input)="selectCollection($event, i)" type="checkbox" class="select-check rounded-md border-gray-400 cursor-pointer ">
                            </span>
                        </div>
                    }
                </div>
            }
            @else {
                
            <div class="flex flex-col items-center justify-center w-full p-10">
                @if(loaded() == false) {
                    <div class="mb-3">Empty Media Collection</div>
                    <img src="no-data.svg" alt="" class="opacity-30 w-16">
                }
                @else {
                    <span class="loader mx-auto"></span>
                }   
            </div>

            }
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            @if(files().length) {
                <button mat-button [mat-dialog-close]="true">Add Photo</button>
            } @else {
                <a mat-button [mat-dialog-close]="true" [routerLink]="['/user/media/upload']">Upload</a>
            }
        </mat-dialog-actions>
    `,
    imports: [MatPaginatorModule, MatDialogModule, MatButtonModule, RouterLink]
}) 

export default class SelectMediaDialog implements OnInit { 
    
    // private _dataService = inject(DataService)
    // private _notification = inject(NotificationService)
    
    private _elr = inject(ElementRef)
    paginator = viewChild<MatPaginator>(MatPaginator)
    dataSource: MatTableDataSource<any[]> = new MatTableDataSource();

    pageSizeOptions: number[] = PAGINATION_LIMITS
    totalItems: number;
    files = signal<any[]>([])
    loaded = signal<boolean>(false)
    selectedFiles = new Set()

    constructor(public dialogRef: MatDialogRef<SelectMediaDialog>, @Inject(MAT_DIALOG_DATA) public data: {type: string}) { }

    ngOnInit() {
        this.fetchCollections()
    }

    fetchCollections() {
        // this._dataService.getFiles().pipe(untilDestroyed(this)).subscribe(
        //     res => {
        //         this.files = res.data;
        //         this.totalItems = this.files.length;
        //         this.loadData();
        //         this.dataSource.paginator = this.paginator;
        //         if(!this.files.length) this.loaded = false
        //     },
        //     () => {
        //         this._notification.openSnackBar('Sorry! Unable to retrieve collections', 'error')
        //         this.loaded = false
        //     }
        // );
    }

    selectCollection(event:Event, index:number) {
        const input = (event.currentTarget as HTMLInputElement)
        if(this.selectedFiles.size == 0) {
            if(input.checked)  this.selectedFiles.add(
                {
                    public_id: (this.dataSource.data[index] as any).public_id,
                    url: (this.dataSource.data[index] as any).url
                }, 
            )
        }
        else {
            if(!input.checked) {
                this.uncheckInputs()
                this.selectedFiles.clear()
            }
            else {
                this.selectedFiles.clear()
                this.uncheckInputs()
                this.selectedFiles.add(
                    {
                        public_id: (this.dataSource.data[index] as any).public_id,
                        url: (this.dataSource.data[index] as any).url
                    }, 
                )
                input.checked = true
            }
        }
    }

    returnSelectedImage() {
        this.dialogRef.close({selectedFiles: Array.from(this.selectedFiles)})
    }

    uncheckInputs() {
        const checkboxes = (this._elr.nativeElement.querySelectorAll('.select-check') as HTMLCollection)
        Array.from(checkboxes).forEach((item:any) => item.checked = false)
    }

    onPageChange(event: PageEvent) {
        this.loadData(event.pageIndex + 1, event.pageSize);
    }

    private loadData(pageIndex: number = 1, pageSize: number = 20) {
        this.dataSource.data = loadData(pageIndex, pageSize, this.files())
    }
}