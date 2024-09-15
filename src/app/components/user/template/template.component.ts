import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterOutlet } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import AppService from '../../../services/app.service';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [NavigationComponent, RouterOutlet, UserProfileComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export default class TemplateComponent {
  private _appService = inject(AppService)

  closeNav() {
    this._appService.closeUserNav()
  }
}
