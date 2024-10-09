import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import DataService from "../../services/data.service";
import ComponentsEventService from "../../store/components-event";
import { HotToastService } from "@ngxpert/hot-toast";
import AuthService from "../../services/auth.service";


@UntilDestroy()
@Component({
    standalone: true,
    selector: 'login',
    template: `

        <div class="flex flex-col lg:mt-10 p-5 lg:px-10 h-max ">
            <h4 class="mb-7 title font-sans">Sign In</h4>
            <form [formGroup]="form" (ngSubmit)="submitHandler()">
                <div class="flex flex-col gap-3">
                    <div class="flex flex-col gap-1">
                        <label for="email" class="capitalize text-2xs font-medium">Email Address</label>
                        <input formControlName="email" type="text" class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="text-xs text-red-500">
                            @if(form.get('email')?.invalid && form.get('email')?.touched) {
                                @if(form.get('email')?.hasError('required')) {
                                    Email is required
                                }
                                @else if(form.get('email')?.hasError('email')) {
                                    Invalid email address
                                }
                            }
                        </span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="password" class="capitalize text-2xs font-medium">Password</label>
                        <input formControlName="password" type="password" class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="text-xs text-red-500">
                            @if(form.get('password')?.invalid && form.get('password')?.touched) {
                                @if(form.get('password')?.hasError('required')) {
                                    Password is required
                                }
                            }
                        </span>
                    </div>

                </div>
                <div (click)="setAuthEvent('forgot')" class="my-3 text-xs font-normal text-gray-400 cursor-pointer hover:underline">Forgot Password?</div>
                <button [disabled]="pending()" type="submit" class="btn w-full">Sign In</button>
                <div class="mt-5 leading-snug text-center text-xs font-medium"> Dont have an account? <button type="button" (click)="setAuthEvent('signup')" class="text-primary"> Sign up </button></div>
            </form>
        </div>
    `,
    imports: [ReactiveFormsModule]
})

export default class LoginComponent implements OnInit {
    private _eventService = inject(ComponentsEventService)
    private _toast = inject(HotToastService)
    private _dataService = inject(DataService)
    private _authService = inject(AuthService)

    form: FormGroup;
    pending = signal(false)

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        })
    }

    submitHandler() {
        if (this.form.invalid) return this.form.markAllAsTouched()

        const payload = { ...this.form.value }
        this.signinHandler(payload)
    }

    signinHandler(payload: any) {
        this.pending.set(true)
        this._dataService.signin(payload).pipe(untilDestroyed(this)).subscribe({
            next: (res:any) => {
                this._authService.setAuth(res.token, res.user)
                location.href = `${location.origin}${location.pathname}`
            },            
            error: (error:any) => {
                this.pending.set(false)
                if(error.error) {
                    this._toast.error(error.error)
                }
                else this._toast.error("Sorry! We encountered some challenges. try again")
            }
        })
    }

    setAuthEvent(type: string) {
        this._eventService.setEvent({ authentication: type })
    }
}

