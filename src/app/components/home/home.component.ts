import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import StateService from '../../store/state';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {
    private stateService = inject(StateService)

    list = computed(() => {
      const { cities, faqs } = this.stateService.currentState()
      return { cities, faqs }
    })
}
