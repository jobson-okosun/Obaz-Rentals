import { Component } from '@angular/core';
import { APPNAME } from '../../../utils/config';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterLink } from '@angular/router';
import SearchComponent from '../../search/search/search.component';


@Component({
  selector: 'header',
  standalone: true,
  imports: [NavigationComponent, RouterLink, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export default class HeaderComponent {
  appName = APPNAME

  openNav() {
    const nav = document.querySelector('nav');
    (nav as HTMLElement).style.display = 'block'
  }

}
