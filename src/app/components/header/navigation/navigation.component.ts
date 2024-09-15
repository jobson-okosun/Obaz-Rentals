import { Component, inject } from '@angular/core';
import { routes } from '../../../utils/statics';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import AppService from '../../../services/app.service';

@Component({
  selector: 'nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  private sanitizer = inject(DomSanitizer)
  private _appService = inject(AppService)
  routes = routes

  sanitize(str: string) {
    return this.sanitizer.bypassSecurityTrustHtml(str)
  }

  closeNav() {
    this._appService.closeNav()
  }
  
  closeNavResponsive() {
    const isMobile = window.matchMedia('(max-width: 768px)')
    if(isMobile.matches) {
       this.closeNav()
    }
  }
}
