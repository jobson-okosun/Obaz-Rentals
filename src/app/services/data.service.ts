import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GEO_NAMES_USERNAME } from "../utils/config";

@Injectable({
    providedIn: 'root'
})

export default class DataService {
    private _http = inject(HttpClient)

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
}