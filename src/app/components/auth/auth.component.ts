import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import DataService from "../../services/data.service";
import LoginComponent from "./login.component";
import ForgotPasswordComponent from "./password/forgot-password.component";
import ResetPasswordComponent from "./password/reset-password.component";
import SignupComponent from "./signup.component";
import ComponentsEventService from "../../store/components-event";

@UntilDestroy()
@Component({
    standalone: true,
    selector: 'auth',
    template:  `
        <div class="bg-white w-full lg:w-[30%] 3xl:w-[25%] h-full lg:float-right relative overflow-y-auto">
            <div class="m-3 absolute top-0 right-0 flex justify-end items-center">
                <button (click)="setEvent()" class="material-symbols-outlined h-7 w-7 font-bold">close</button>
            </div>
            <div>
                @if(template().includes('signup')) {
                    <signup/>
                } 
                @else if(template().includes('login')){
                    <login/>
                }
                @else if(template().includes('forgot')){
                    <forgot-password/>
                }
                @else if(template().includes('reset')){
                    <reset-password/>
                }
            </div>
        </div>
    `,
    imports: [SignupComponent, LoginComponent, ForgotPasswordComponent, ResetPasswordComponent]
}) 

export default class AuthComponent {  
    private _eventService = inject(ComponentsEventService) 

    template = computed(() => this._eventService.events().authentication) 

    setEvent() {
        this._eventService.setEvent({ authentication: ''})
    }
}

