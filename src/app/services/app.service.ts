import { inject, Injectable } from "@angular/core";
import { Event, NavigationEnd, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export default class AppService { 
    private router = inject(Router)

    initializePrimelineComponents() {
        this.router.events.subscribe((event: Event) => {
            if(event instanceof NavigationEnd) {
                setTimeout(() => window.HSStaticMethods?.autoInit(), 100);
            }
        })
    }
}