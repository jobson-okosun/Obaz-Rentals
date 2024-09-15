import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export default class ComponentsEventService {
    events  = signal({})
}