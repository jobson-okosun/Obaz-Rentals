import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'city',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {

  prop = input.required<any>({})

  item = computed(() => {
    if (this.prop()) {
      const cityName = this.prop().name
      const location = `${ this.prop().state ? (this.prop().state + ',') : '' } ${ this.prop().country }`
      const image = `cities/${ this.prop().image }`
      return { cityName, location, image  }
    }
    return
  })
  
}
