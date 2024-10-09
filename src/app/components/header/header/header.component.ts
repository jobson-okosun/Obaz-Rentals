import { Component, computed, inject} from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterLink } from '@angular/router';
import SearchComponent from '../../search/search/search.component';
import StateService from '../../../store/state';
import AppService from '../../../services/app.service';
import ComponentsEventService from '../../../store/components-event';
import AuthService from '../../../services/auth.service';

@Component({
  selector: 'header',
  standalone: true,
  imports: [NavigationComponent, RouterLink, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export default class HeaderComponent {
  private _stateService = inject(StateService)
  private _appService = inject(AppService)
  private _authService = inject(AuthService)
  private _eventsService = inject(ComponentsEventService)

  state = computed(() => this._stateService.currentState())

  openNav() {
    this._appService.openNav()
  }

  openUserNav() {
    this._appService.openUserNav()
  }

  showSearch():boolean {
    if(!this.state().isMobile) {
      return true
    } else if(this.state().isMobile && !this.state().location.includes('user')) {
      return true
    } else return false
  }

  setAuthEvent(type:string) {
     this._eventsService.setEvent({ authentication: type })
  }

  logoff() {
     this._authService.logoff()
  }

}
