import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [NgClass],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export default class FeedbackComponent {
  ratingsHoverIndex = signal(0)

  arrayFrom(length: number) {
      return Array.from({ length })
  }
}
