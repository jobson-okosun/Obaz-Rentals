import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, Event, NavigationEnd, Router } from "@angular/router";
import StateService from "../store/state";
import { ViewportScroller } from "@angular/common";
import ComponentsEventService from "../store/components-event";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../environments/environment";
import DataService from "./data.service";


@Injectable({
    providedIn: 'root'
})

export default class AppService {
    private _router = inject(Router)
    private _stateService = inject(StateService)
    private _viewportScroller = inject(ViewportScroller)
    private _route = inject(ActivatedRoute)
    private _eventService = inject(ComponentsEventService)
    private _state = inject(StateService)
    private _cookieService = inject(CookieService)
    private _dataService = inject(DataService)


    private _cookieSessionToken = '_UID'
    private _cookieSessionData = '_UIF'

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

    onInitialization() {
        this.setUserAuthData()

        const state = this._state.currentState()
        if (!!state.user) {
            this._dataService.getCurrentUser().subscribe()
        }


        this._route.queryParamMap.subscribe((route) => {
            if (route.get('auth-pane') && route.get('for')) {
                this._eventService.setEvent({ authentication: 'reset' })
            }

            if (route.get('login')) {
                this._eventService.setEvent({ authentication: 'login' })
            }
        })
    }

    setUserAuthData() {
        const token = this._cookieService.get(this._cookieSessionToken)
        const userData = this._cookieService.get(this._cookieSessionData) ? JSON.parse(this._cookieService.get(this._cookieSessionData)) : {}

        if (token && userData) {
            const data = { token, ...userData}
            this._state.updateStore({ user: data })
        }

        if (!environment.production) {
            console.log({ state: this._state.currentState() })
        }
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