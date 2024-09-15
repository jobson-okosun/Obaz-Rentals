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
        myListing: [],
        bookings: [],
        booking: null,
        payments: [],
        payment: null,
        faqs: faqs,
        hostFaqs: hostFaqs,
        user: null,
        contact: {email: { support: 'info@obazmanagement.com', security: 'security@obazmanagement.com' }},
        isMobile: false,
        isPlatformBrowser: false,
        webShareSupported: false,
        location: '/',
    })

    currentState = this.state.asReadonly()

    updateStore(data: any) {
        this.state.update( (update:any) => {
            Object.keys(data).forEach(key => {
                update[key] = data[key]
            })
            return update
        })
    }
}