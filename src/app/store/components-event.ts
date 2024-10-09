import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export default class ComponentsEventService {

    events  = signal({
        authentication: ''
    })

    setEvent(data: any) {
        this.events.update((value) => {
            const update = { ...value, ...data }
            return update
        })
    }
}