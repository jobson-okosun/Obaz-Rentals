import { Injectable, signal } from "@angular/core";
import { State } from "../model/interfaces";
import { cities, faqs, hostFaqs } from "../utils/statics";
import { APPNAME } from "../utils/config";

@Injectable({
    providedIn: 'root'
})
export default class StateService { 

    private state = signal<State>({
        appName: APPNAME,
        cities: cities,
        hotRentals: [],
        wishlist: [],
        search: [],
        faqs: faqs,
        hostFaqs: hostFaqs,
        contact: {
            email: {
                support: 'info@obazmanagement.com',
                security: 'security@obazmanagement.com'
            }
        }
    })

    currentState = this.state.asReadonly()
}