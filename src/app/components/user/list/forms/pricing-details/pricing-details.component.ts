import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputDirective } from '../../../../../directives/currency.directive';

@Component({
  selector: 'app-pricing-details',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyInputDirective],
  templateUrl: './pricing-details.component.html',
  styleUrl: './pricing-details.component.css'
})
export class PricingDetailsComponent {
  form = input.required<FormGroup>()
}
