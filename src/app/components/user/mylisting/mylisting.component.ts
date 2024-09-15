import { afterRender, Component, computed, inject } from '@angular/core';
import StateService from '../../../store/state';
import { initSwiper } from '../../../utils/helper';
import RentalComponent from '../../shared/rental/rental.component';

@Component({
  selector: 'app-mylisting',
  standalone: true,
  imports: [RentalComponent],
  templateUrl: './mylisting.component.html',
  styleUrl: './mylisting.component.css'
})
export default class MylistingComponent {
  private stateService = inject(StateService)
  swiperSelector: string = 'swiper-enabled'

  list = computed(() => {
    const { myListing, cities } = this.stateService.currentState()
    return { myListing: [cities[0], cities[1], cities[2], cities[3], cities[4]] }
  })

  constructor() {
    afterRender(() => {
      initSwiper(`.${this.swiperSelector}`)
    })
  }
}
