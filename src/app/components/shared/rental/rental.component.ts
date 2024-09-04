import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOCALE } from '../../../utils/config';
import { cities } from '../../../utils/statics';
import { parseRentalUrl } from '../../../utils/helper';

@Component({
  selector: 'rental',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, CurrencyPipe],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class RentalComponent {
  prop = input.required<any>({})

  item = computed(() => {
    if (this.prop()) {

      const title = 'Oceanfront Fab, Spa, Sauna, Sandy Beach'
      const details = '3 beds, 3 bedroom , 2 bathroom &middot; House'
      const location = 'Largo, Florida'
      const price = 508
      const rating = '★ New'
      const locale = LOCALE
      const citieslist = cities
      const images = [citieslist[0], citieslist[1], citieslist[2]]
      const url = ['/', 'rooms', parseRentalUrl('nex-vacation-room')]

      return { title, details, location, price, rating, images, locale, url }
    }
    return
  })
  
}
