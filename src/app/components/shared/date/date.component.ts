import { DatePipe, NgClass } from '@angular/common';
import { Component, input, model, output } from '@angular/core';
import { addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, setMonth, setYear} from 'date-fns';

interface Day {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}


@Component({
  selector: 'datepicker',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})

export class DateComponent {
  
  config = input.required<{ totalPickers: number, default: Date }>()
  
  selectedDate = model(new Date());
  selectedMonth = model<any>();
  selectedYear = model<number>();
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  weekDays: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
  calendarDays: any[][] = [];
  years: number[] = Array.from({ length: 20 }, (_, i) => this.selectedYear()! - 10 + i)

  ngOnInit(): void {
    this.selectedDate.set(this.config().default)
    this.selectedMonth.set(this.selectedDate().getMonth());
    this.selectedYear.set(this.selectedDate().getFullYear());
    this.generateCalendar();
  }

  generateCalendar(): void {
    const start = startOfWeek(startOfMonth(this.selectedDate()), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(this.selectedDate()), { weekStartsOn: 1 });

    const days: Day[] = eachDayOfInterval({ start, end }).map(date => ({
      date: date.getDate(),
      isCurrentMonth: isSameMonth(date, this.selectedDate()),
      isToday: isToday(date)
    }));

    this.calendarDays = [];
    for (let i = 0; i < days.length; i += 7) {
      this.calendarDays.push(days.slice(i, i + 7));
    }
  }

  previousMonth(month:HTMLSelectElement, year:HTMLSelectElement): void {
    const selectedIndex = month.selectedIndex == 0 ? 11 : month.selectedIndex - 1
    month.nextElementSibling!.firstElementChild!.innerHTML = this.months[selectedIndex];
    this.selectedDate.set(addMonths(this.selectedDate(), - 1));
    this.selectedMonth.set(this.selectedDate().getMonth());
    this.selectedYear.set(this.selectedDate().getFullYear());
    year.nextElementSibling!.firstElementChild!.innerHTML = this.selectedDate().getFullYear().toString()
    this.generateCalendar();
  }

  nextMonth(month:HTMLSelectElement, year:HTMLSelectElement): void {
    const selectedIndex = month.selectedIndex == 11 ? 0 : month.selectedIndex + 1;
    month.nextElementSibling!.firstElementChild!.innerHTML = this.months[selectedIndex]
    this.selectedDate.set(addMonths(this.selectedDate(), 1));
    this.selectedMonth.set(this.selectedDate().getMonth());
    this.selectedYear.set(this.selectedDate().getFullYear());
    year.nextElementSibling!.firstElementChild!.innerHTML = this.selectedDate().getFullYear().toString()
    this.generateCalendar();
  }

  changeMonth(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newMonth = parseInt(selectElement.value, 10);
    this.selectedDate.set(setMonth(this.selectedDate(), newMonth));
    this.selectedMonth.set(newMonth);
    this.generateCalendar();
  }

  changeYear(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newYear = parseInt(selectElement.value, 10);
    this.selectedDate.set(setYear(this.selectedDate(), newYear));
    this.selectedYear.set(newYear);
    this.generateCalendar();
  }

  toJson(data:any) {
    return JSON.stringify(data)
  }  

  getYears() {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear + i);
  }
  
  selectDate(day: Day): void {
    if (day.isCurrentMonth) {
      this.selectedDate.set(new Date(this.selectedYear()!, this.selectedMonth(), day.date));
      this.generateCalendar();
    }
  }
}
