import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet} from '@angular/router';

import { IStaticMethods } from 'preline/preline';
import AppService from './services/app.service';
import { NgwWowService } from 'ngx-wow';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})

export class AppComponent implements OnInit {

  private appService = inject(AppService)
  private wowService = inject(NgwWowService)

  constructor() {
    this.wowService.init();
  }
  
  ngOnInit(): void {
     this.appService.initializeComponents()
  }
}
