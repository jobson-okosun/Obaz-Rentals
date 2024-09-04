import { Component } from '@angular/core';
import { APPNAME } from '../../utils/config';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export default class AboutComponent {
  appName = APPNAME
}
