import { inject, Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import StateService from "../store/state";
import { environment } from "../../environments/environment";
import { User } from "../model/interfaces";



@Injectable({
    providedIn: 'root'
})

export default class AuthService { 
    
    private _stateService = inject(StateService)
    private _cookieService = inject(CookieService)
    private _cookieSessionToken = '_UID'
    private _cookieSessionData = '_UIF'
    
    isAuth(): boolean {
        return !!this._cookieService.check(this._cookieSessionToken)
    }

    setAuth(token:string, user?: User) {
        this._cookieService.set(this._cookieSessionToken, token, { secure: environment.production, sameSite: 'Lax'})  
        this._cookieService.set(this._cookieSessionData, JSON.stringify(user), { secure: environment.production, sameSite: 'Lax'})
             
        this._stateService.updateStore({ user })
    }

    getAuth():string {
        return this._cookieService.get(this._cookieSessionToken)
    }

    logoff() {
        this._cookieService.delete(this._cookieSessionToken)
        this._cookieService.delete(this._cookieSessionData)

        
        location.reload()
    }
}