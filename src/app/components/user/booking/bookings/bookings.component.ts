import { Component, computed, inject } from '@angular/core';
import { PRELINE_COMPONENTS } from '../../../../utils/statics'
import StateService from '../../../../store/state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export default class BookingsComponent {
  private _stateService = inject(StateService)
  private _router = inject(Router)

  PRELINE_COMPONENTS = PRELINE_COMPONENTS
  state = computed(() => {
    if(!this._stateService.currentState()) return {}
    const { bookings } = this._stateService.currentState()
    const mockBookings = [
      {
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
        numberOfGuests: 2
      },
      {
        bookingId: '67890',
        propertyName: 'Urban Loft',
        guestName: 'Jane Smith',
        checkInDate: '2024-10-01',
        checkOutDate: '2024-10-05',
        bookingStatus: 'Pending',
        totalPrice: 800,
        bookingDate: '2024-09-10',
        paymentStatus: 'Pending',
        cancellationPolicy: 'Flexible',
        reviewStatus: 'Not Submitted',
        numberOfGuests: 3
      }
    ]
    const tableHeaders = ['Property Name','Guest Name','Check-In','Check-Out','Booking Status','Price','Booking Date','Payment Status','Review Status', 'No of Guests']
    return { bookings: mockBookings, tableHeaders }
  })

  viewBooking(bookingId: string) {
    this._router.navigate(['/user/bookings', bookingId])
  }
}
 