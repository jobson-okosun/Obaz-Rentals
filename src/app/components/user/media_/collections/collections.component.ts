import { Component, signal, viewChild } from '@angular/core';
import { loadData } from '../../../../utils/helper';
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { PAGINATION_LIMITS } from '../../../../utils/config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [MatMenuModule, MatPaginatorModule, RouterLink],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export default class CollectionsComponent {
    
    // private _dataService = inject(DataService)
    // private _notification = inject(NotificationService)

    dataSource: MatTableDataSource<any[]> = new MatTableDataSource();
    pageSizeOptions: number[] = PAGINATION_LIMITS
    totalItems: number;
    paginator = viewChild<MatPaginator>(MatPaginator)

    files  = signal<any[]>([])
    loaded = signal<boolean>(false)
    selectedFiles = new Set()

    ngOnInit() {
        this.fetchCollections()
    }

    fetchCollections() {
        // this._dataService.getFiles(false).pipe(untilDestroyed(this)).subscribe({
        //     next: (res:any) => {
        //         this.files = res.data;
        //         this.totalItems = this.files.length;
        //         this.loadData();
        //         this.dataSource.paginator = this.paginator;
        //         if(!this.files.length) this.loaded = false
        //     },
        //     error: () => {
        //         this._notification.openSnackBar('Sorry! Unable to retrieve collections', 'error')
        //         this.loaded = false
        //     }
        // });
    }

    removeFiles(event:Event): void {
        const publicIds = Array.from(this.selectedFiles)
        if(!publicIds.length) return 

        const btn =( event?.currentTarget as HTMLButtonElement)
        btn.disabled = true
        // this._dataService.removeFile(publicIds).pipe(untilDestroyed(this)).subscribe({
        //     next: (res:any) => {
        //         const keys = Object.keys(res.data)
        //         keys.forEach((item:any) => {
        //             if(res.data[item].includes('deleted')) {
        //                 this._notification.openSnackBar('File deleted successfully', 'success')
        //             }
        //             else this._notification.openSnackBar('File not deleted', 'error')
        //         }) 

        //         this.fetchCollections();
        //         btn.disabled = false
        //     },
        //     error: (error:any) => {
        //         this._notification.openSnackBar(error.message, 'error');
        //         btn.disabled = false
        //     }
        // });
    }

    selectColletion(event:Event, index:number) {
        const input = (event.currentTarget as HTMLInputElement)
        if(input.checked)  this.selectedFiles.add((this.dataSource.data[index] as any).public_id)
        else this.selectedFiles.delete((this.dataSource.data[index] as any).public_id)
    }

    onPageChange(event: PageEvent) {
        this.loadData(event.pageIndex + 1, event.pageSize);
    }

    private loadData(pageIndex: number = 1, pageSize: number = 20) {
        this.dataSource.data = loadData(pageIndex, pageSize, this.files())
    }
}
