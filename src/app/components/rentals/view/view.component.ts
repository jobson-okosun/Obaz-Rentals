import { Component, input, model, signal } from '@angular/core';
import { DateComponent } from '../../shared/date/date.component';
import CalendarComponent from "../../shared/calendar/calendar.component";

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export default class ViewComponent {

   title = input.required()
   checkin = signal<string>(this.formatDate(new Date()))
   checkout = signal<string>(this.formatDate(new Date()))

   adults = signal<number>(1)
   children = signal<number>(0)
   infant = signal<number>(0)
   pets = signal<number>(0)

   closeCalender(event:any) {
      document.body.click()
      if(event) {
         const [checkin, checkout] = event.selected
         this.checkin.set(this.formatDate(checkin))
         this.checkout.set(this.formatDate(checkout))
      }
  }

  formatDate(str:Date) {
    return new Date(str).toLocaleDateString()
  }

  calculateGuest() {
    console.log((this.adults() + this.children()) === 5 ? false : true)
    return (this.adults() + this.children()) === 5 ? false : true 
  }

}
