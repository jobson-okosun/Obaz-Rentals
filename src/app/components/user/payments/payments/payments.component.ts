import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import StateService from '../../../../store/state';
import { PRELINE_COMPONENTS } from '../../../../utils/statics';
import { DatePipe } from '@angular/common';
import { PdfService } from '../../../../services/pdf.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export default class PaymentsComponent {
  private _stateService = inject(StateService)
  private _table = viewChild<ElementRef>('table')
  private _pdfService = inject(PdfService)
  private _router = inject(Router)

  PRELINE_COMPONENTS = PRELINE_COMPONENTS
  state = computed(() => {
    if (!this._stateService.currentState()) return {}
    const { payments } = this._stateService.currentState()
    const mockPayments= [
      {
        id: '1',
        date: new Date(),
        amount: 100.00,
        paymentMethod: 'Credit Card',
        status: 'Completed',
        transactionId: '23gsfsf',
        description: 'Completed payment',
      },
      {
        id: '2',
        date: new Date(),
        amount: 50.00,
        paymentMethod: 'Paypal',
        status: 'Pending',
        transactionId: '23gsfsf',
        description: 'Completed payment for booking'
      },
    ]
    const tableHeaders = ['Date', 'Amount', 'Payment Method', 'Status', 'Transaction ID', 'Description']
    return { payments: mockPayments, tableHeaders }
  })

  viewPayment(paymentRef: string) {
    this._router.navigate(['/user/payments', paymentRef])
  }

  downloadPDF() {
    const query = document.querySelectorAll('.no-pr')
    query.forEach((item:any) => {
      (item as HTMLElement).classList.add('!hidden')
    })

    const config = {format: 'a4', orientation: 'landscape'}
    const element = this._table()?.nativeElement as HTMLElement
    const filename = `payment-history.pdf`;
    this._pdfService.generatePDF(element, filename, config).then(() => {
      query.forEach((item:any) => {
        (item as HTMLElement).classList.remove('!hidden')
      })
    })
  }
}
