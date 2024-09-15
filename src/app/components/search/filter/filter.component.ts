import { Component, signal } from '@angular/core';
import CalendarComponent from '../../shared/calendar/calendar.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  checkin = signal<string | null>(null)
  checkout = signal<string | null>(null)

  closeCalender(event: any, input: string) {
    document.body.click()
    if (event) {
      const [date] = event.selected

      if(input === 'checkin') {
        this.checkin.set(this.formatDate(date))
        return
      }

      this.checkout.set(this.formatDate(date))
    }
  }

  formatDate(str:Date) {
    return new Date(str).toLocaleDateString()
  }
}
