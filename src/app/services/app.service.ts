import { inject, Injectable } from "@angular/core";
import { Event, NavigationEnd, Router } from "@angular/router";
import StateService from "../store/state";
import { ViewportScroller } from "@angular/common";


@Injectable({
    providedIn: 'root'
})

export default class AppService {
    private _router = inject(Router)
    private _stateService = inject(StateService)
    private _viewportScroller = inject(ViewportScroller)

    constructor() {
        this.setStoreData()
        this.initializeComponents()
    }


    private setStoreData() {
        const res = window.matchMedia('(max-width: 768px)').matches
        const update = {
            isMobile: res,
            isPlatformBrowser: true,
            location: location.pathname,
            webShareSupported: navigator.share !== undefined
        }
        this._stateService.updateStore(update)
    }

    initializeComponents() {
        this._router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                setTimeout(() => window.HSStaticMethods?.autoInit(), 100);
                this.setStoreData()
                this._stateService.updateStore({ location: event.url })
                this._viewportScroller.scrollToPosition([0, 0]);
            }
        })
    }

    openNav() {
        const nav = document.querySelector('nav');
        (nav as HTMLElement).style.display = 'block'
    }

    openUserNav() {
        const nav = document.querySelector('#user-navigation');
        (nav as HTMLElement).style.display = 'block'
    }


    closeNav() {
        const nav = document.querySelector('nav');
        (nav as HTMLElement).style.display = 'none'
    }

    closeUserNav() {
        const nav = document.querySelector('#user-navigation');
        (nav as HTMLElement).style.display = 'none'
    }
}