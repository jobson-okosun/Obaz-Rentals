import { afterRender, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import StateService from '../../../store/state';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { initSwiper } from '../../../utils/helper';
import RentalComponent from '../../shared/rental/rental.component';
import { CityComponent } from '../../shared/city/city.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RentalComponent, CityComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ListComponent {

  private stateService = inject(StateService)
  swiperSelector: string = 'swiper-enabled'

  list = computed(() => {
    const { cities, hotRentals } = this.stateService.currentState()
    return { cities, rentals: [cities[0], cities[1], cities[2], cities[3], cities[4]]}
  })

  constructor() { 
    afterRender(() => {
       initSwiper(`.${this.swiperSelector}`)
    })
  }
}
