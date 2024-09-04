import { afterRender, Component, computed, inject } from '@angular/core';
import StateService from '../../store/state';
import { initSwiper } from '../../utils/helper';
import RentalComponent from '../shared/rental/rental.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RentalComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export default class WishlistComponent {
  private stateService = inject(StateService)
  swiperSelector: string = 'swiper-enabled'

  list = computed(() => {
    const { wishlist, cities } = this.stateService.currentState()
    return { wishlist: [cities[0], cities[1], cities[2], cities[3], cities[4]] }
  })

  constructor() {
    afterRender(() => {
      initSwiper(`.${this.swiperSelector}`)
    })
  }
}
