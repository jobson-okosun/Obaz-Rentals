import { Component, computed, inject } from '@angular/core';
import StateService from '../../store/state';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export default class ContactComponent {
  private _stateService = inject(StateService)

  appName = computed(() => this._stateService.currentState().appName)
  contact = computed(() => this._stateService.currentState().contact)
}
