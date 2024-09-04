import { Component, computed, inject } from '@angular/core';
import StateService from '../../store/state';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css'
})
export default class CareersComponent {
  private _stateService = inject(StateService)

  contact = computed(() => this._stateService.currentState().contact)
}
