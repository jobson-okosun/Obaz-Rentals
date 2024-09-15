import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-house-rules-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './house-rules-details.component.html',
  styleUrl: './house-rules-details.component.css'
})
export class HouseRulesDetailsComponent {
  form = input.required<FormGroup>()
}
