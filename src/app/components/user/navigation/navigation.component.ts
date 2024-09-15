import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import AppService from '../../../services/app.service';

@Component({
  selector: 'user-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  private _appService = inject(AppService)

  closeNavResponsive() {
    const isMobile = window.matchMedia('(max-width: 768px)')
    if (isMobile.matches) {
      this._appService.closeUserNav()
    }
  }
}
