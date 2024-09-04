import { afterRender, Component, computed, inject} from '@angular/core';
import StateService from '../../../store/state';
import { initSwiper } from '../../../utils/helper';
import RentalComponent from '../../shared/rental/rental.component';
import { FilterComponent } from '../filter/filter.component';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RentalComponent, FilterComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export default class CatalogComponent {
  private _stateService = inject(StateService)
  swiperSelector: string = 'swiper-enabled'
  
  list = computed(() => {
    const { search, cities } = this._stateService.currentState()
    return { search: [cities[0], cities[1], cities[2], cities[3], cities[4]] }
  })

  constructor() {
    afterRender(() => {
      initSwiper(`.${this.swiperSelector}`)
    })
  }
}
