import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RequestInterceptor } from './interceptors/request.interceptor';
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([RequestInterceptor])),
    provideExperimentalZonelessChangeDetection(),
    provideHotToastConfig({ className : 'toast'}), 
    provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
 