import { afterRender, Component, computed, inject, } from '@angular/core';
import HeaderComponent from '../header/header/header.component';
import { NavigationComponent } from '../header/navigation/navigation.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import StateService from '../../store/state';
import ComponentsEventService from '../../store/components-event';
import AuthComponent from '../auth/auth.component'
import AppService from '../../services/app.service';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [HeaderComponent, NavigationComponent, RouterOutlet, FooterComponent, AuthComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export default class TemplateComponent {
  private _stateService = inject(StateService);
  private _eventService = inject(ComponentsEventService)
  private _appService = inject(AppService)

  state = computed(() => this._stateService.currentState())
  events = computed(() => this._eventService.events())


  setEvent() {
    this._eventService.setEvent({ authentication: '' })
  }

  ngOnInit(): void {
    this._appService.onInitialization()
  }
}
