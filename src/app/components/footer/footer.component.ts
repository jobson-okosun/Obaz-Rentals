import { Component, computed, inject } from '@angular/core';
import { APPNAME } from '../../utils/config';
import StateService from '../../store/state';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private _stateService = inject(StateService)

  appName = computed(() => this._stateService.currentState().appName)

  year = new Date().getFullYear()
}
