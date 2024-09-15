import { Component, computed, inject,} from '@angular/core';
import HeaderComponent from '../header/header/header.component';
import { NavigationComponent } from '../header/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import StateService from '../../store/state';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [HeaderComponent, NavigationComponent, RouterOutlet, FooterComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export default class TemplateComponent{
  private _stateService = inject(StateService);
  state = computed(() => this._stateService.currentState())

}
