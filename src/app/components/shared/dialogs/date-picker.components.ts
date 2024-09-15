import { Component, computed, inject, model} from "@angular/core";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import StateService from "../../../store/state";
import { addMonths } from "date-fns";

@Component({
    standalone: true, 
    template: `

        @if(!isMobile()) {
            <div class="sm:flex">
                <mat-card  class="inline-calendar-card">
                    <mat-calendar [(selected)]="date1"></mat-calendar>
                </mat-card>  
                <mat-card  class="inline-calendar-card">
                    <mat-calendar [(selected)]="date2"></mat-calendar>
                </mat-card>
            </div>
        } @else {
            <mat-card  class="inline-calendar-card">
                <mat-calendar [(selected)]="date1" [startAt]="date1()"></mat-calendar>
            </mat-card>
        }

        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-button (click)="closeModal()" [mat-dialog-close]="true" cdkFocusInitial>Done</button>
        </mat-dialog-actions>
    `,
    imports: [MatCardModule, MatDatepickerModule, MatDialogModule, MatButtonModule],
    providers: [provideNativeDateAdapter()]
}) 

export default class DatePickerModalComponent { 
    private _stateService = inject(StateService);
    constructor(public dialogRef: MatDialogRef<DatePickerModalComponent>) { }

    isMobile = computed(() => this._stateService.currentState().isMobile)
    date1 = model<Date>(new Date());
    date2 = model<Date>(addMonths(new Date(), 1));

    closeModal() {
        const result = { dates: [this.date1(), this.date2() ]}
        this.dialogRef.close(result)
    }
}
