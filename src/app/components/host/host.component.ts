import { Component, computed, inject } from '@angular/core';
import StateService from '../../store/state';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export default class HostComponent {

   private stateService = inject(StateService)
   appName = computed( () => this.stateService.currentState().appName)

   list = computed(() => {
    const { hostFaqs } = this.stateService.currentState()
    return { hostFaqs }
  })

}
