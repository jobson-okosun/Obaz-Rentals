import { Component, computed, inject, input } from '@angular/core';
import StateService from '../../../../store/state';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export default class BookingDetailsComponent {
  private _stateService = inject(StateService)

  title = input.required()
  state = computed(() => {
    let { booking } = this._stateService.currentState()
    booking = {
      bookingId: '12345',
      propertyName: 'Cozy Cottage',
      guestName: 'John Doe',
      checkInDate: '2024-09-15',
      checkOutDate: '2024-09-18',
      bookingStatus: 'Confirmed',
      totalPrice: 500,
      bookingDate: '2024-08-12',
      paymentStatus: 'Paid',
      cancellationPolicy: 'Moderate',
      reviewStatus: 'Pending',
      numberOfGuests: 2,
      requestDate: new Date()
    };
     return{ booking }
  })
}
