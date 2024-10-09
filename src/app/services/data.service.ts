import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";
import { GEO_NAMES_USERNAME } from "../utils/config";
import { environment } from "../../environments/environment";
import StateService from "../store/state";
import AuthService from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export default class DataService {
    private _http = inject(HttpClient)
    private _baseUrl = environment.apiBase
    private _state = inject(StateService)
    private _authService = inject(AuthService)
    
    searchLiveAddress(query: string): Observable<any> {
        const url = 'https://nominatim.openstreetmap.org/search';
        return this._http.get(url, {
            params: { q: query, format: 'json', addressdetails: '1', limit: '5' }
        });
    }

    getCitiesByState(stateCode: string): Observable<any> {
        const url = `http://api.geonames.org/searchJSON?country=US&adminCode1=${stateCode}&featureClass=P&username=${GEO_NAMES_USERNAME}`;
        return this._http.get(url);
    }

    signup(payload:any):Observable<any>  { 
        return this._http.post(this._baseUrl + 'auth/register', payload)
    }

    signin(payload:any):Observable<any>  { 
        return this._http.post(this._baseUrl + 'auth/login', payload)
    } 

    forgotPassword(payload:any):Observable<any>  { 
        return this._http.post(this._baseUrl + 'auth/psw/forgot', payload)
    } 

    resetPassword(payload:any):Observable<any>  { 
        return this._http.post(this._baseUrl + 'auth/psw/reset', payload)
    } 

    getCurrentUser():Observable<any>  { 
        return this._http.get(this._baseUrl + 'auth/user').pipe(map((res:any) => {
            if(res.data) {
                const token = this._state.currentState().user?.token ?? ''
                this._authService.setAuth(token, res.data)
                return
            }
        }))
    } 
}