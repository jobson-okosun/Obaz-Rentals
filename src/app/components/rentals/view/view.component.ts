import { Component, computed, inject, input, model, signal } from '@angular/core';
import CalendarComponent from "../../shared/calendar/calendar.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import DatePickerModalComponent from '../../shared/dialogs/date-picker.components';
import StateService from '../../../store/state';
import { HotToastService } from '@ngxpert/hot-toast';
import { RentalRequestReviewComponent } from '../../rental-request-review/rental-request-review.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CalendarComponent, MatDialogModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export default class ViewComponent {
  private _dialog = inject(MatDialog)
  private _stateService = inject(StateService);
  private _toast = inject(HotToastService)


  title = input.required()
  isMobile = computed(() => this._stateService.currentState().isMobile)

  checkin = signal<string>(this.formatDate(new Date()))
  checkout = signal<string>(this.formatDate(new Date()))

  guests = signal<any>({
    adults: 1,
    children: 0,
    infant: 0,
    pets: 0
  })
  
  guest = computed(() =>  {
     return (this.guests().adults > 0 ? this.guests().adults + ' Adult(s) ' : '') + (this.guests().children > 0 ? this.guests().children + ' Children(s) ' : '')
  })

  updateGuests(data: any) {
    this.guests.update((value) => {
       const update = {...value, ...data}
       return update
    })
  }

  openBookingDetails() {
    const ref = this._dialog.open(RentalRequestReviewComponent, { data: { }})
  }


  openDatePicker(type?: string) {
    const ref = this._dialog.open(DatePickerModalComponent)
    ref.afterClosed().subscribe(result => {
      if (result) {

        if (this.isMobile()) {
          if (type == 'checkin') this.checkin.set(this.formatDate(result.dates[0]))
          else this.checkout.set(this.formatDate(result.dates[0]))
          return
        }

        this.checkin.set(this.formatDate(result.dates[0]))
        this.checkout.set(this.formatDate(result.dates[1]))
      }
    })
  }

  closeCalender(event: any) {
    document.body.click()
    if (event) {
      const [checkin, checkout] = event.selected
      this.checkin.set(this.formatDate(checkin))
      this.checkout.set(this.formatDate(checkout))
      this._toast.success('Rental Dates set successfully')
    }
  }

  formatDate(str: Date) {
    return new Date(str).toLocaleDateString()
  }

  calculateGuest() {
    return (this.guests().adults + this.guests().children) === 5 ? false : true
  }

}
