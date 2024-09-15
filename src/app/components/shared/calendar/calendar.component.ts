import { Component, computed, input, output, signal } from "@angular/core";
import { DateComponent } from "../date/date.component";
import { DatePipe } from "@angular/common";
import { addMonths } from "date-fns";

@Component({
    standalone: true,
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    imports: [DateComponent, DatePipe]
})

export default class CalendarComponent { 
    
    selectedDate1 = signal(new Date());
    selectedDate2 = signal(addMonths(new Date(), 1));

    closeEvent = output<null | {}>()
    config = input.required<{ totalPickers: number, cancel?: true | false }>()

    apply() {
        const dates = { selected: [this.selectedDate1(), this.selectedDate2() ]}
        this.closeEvent.emit(dates)
    }
}