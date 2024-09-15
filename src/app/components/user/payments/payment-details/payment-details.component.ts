import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild, ElementRef } from '@angular/core';
import StateService from '../../../../store/state';
import { RouterLink } from '@angular/router';
import { PdfService } from '../../../../services/pdf.service';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [NgClass, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export default class PaymentDetailsComponent {
  private _stateService = inject(StateService)
  private _pdfService = inject(PdfService)
  private _payment = viewChild<ElementRef>('payment')

  title = input.required()
  state = computed(() => {
    let { payment, contact } = this._stateService.currentState()
    payment = {
      id: '1',
      date: new Date(),
      amount: 100.00,
      paymentMethod: 'Credit Card',
      status: 'Completed',
      transactionId: '23gsfsf',
      description: 'Completed payment',
    }
    return { payment, contact }
  })

  downloadPDF() {
    const element = this._payment()?.nativeElement as HTMLElement
    element.classList.toggle('lg:w-full')
    
    const filename = `payment-invoice-${this.state().payment.transactionId}.pdf`;
    this._pdfService.generatePDF(element, filename).then(() => {
      element.classList.toggle('lg:w-full')
    });
  }
}
