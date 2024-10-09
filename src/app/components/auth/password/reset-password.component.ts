import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import DataService from '../../../services/data.service'
import { timer } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import ComponentsEventService from "../../../store/components-event";
import { HotToastService } from "@ngxpert/hot-toast";
import { passwordMatchValidator } from "../../../utils/validators";

@UntilDestroy()
@Component({
    standalone: true,
    selector: 'reset-password',
    template: `

        <div class="flex flex-col lg:mt-10 p-5 lg:px-10 h-max ">
            <h4 class="text-2xl font-black font-sans">Reset Password</h4>
            <p class="opacity-80 mt-2 mb-7 text-xs">Enter your new password below</p>
            <form [formGroup]="form" (ngSubmit)="submitHandler()">
                <div class="flex flex-col gap-1">
                        <label for="password" class="capitalize text-2xs font-medium">New Password</label>
                        <input formControlName="password" type="password" placeholder="Enter Password" class="w-full border border-gray-200 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="text-xs text-red-500">
                            @if(form.get('password')?.invalid && form.get('password')?.touched) {
                                    @if(form.get('password')?.hasError('required')) {
                                        Password is required
                                    }
                                    @else if(form.get('password')?.hasError('minlength')) {
                                        Password must be 6 or more characters
                                    }
                                    @else if(form.get('password')?.hasError('serverError')) {
                                    {{ form.get('password')!.errors?.['serverError'] }}
                                }
                            }
                        </span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="confirmPassword" class="capitalize text-2xs font-medium">Confirm new Password</label>
                        <input formControlName="confirmPassword" type="password" placeholder="Confirm Password" class="w-full border border-gray-200 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="text-xs text-red-500">
                            @if(form.get('confirmPassword')?.invalid && form.get('confirmPassword')?.touched) {

                                @if(form.get('confirmPassword')?.hasError('required')) {
                                    Confirm Password is required
                                }
                            }
                            @else if(form.hasError('passwordMismatch') && form.get('confirmPassword')?.dirty) {
                                    Passwords does not match
                            }
                        </span>
                    </div>
                <button [disabled]="pending()" type="submit" class="btn w-full mt-5">update password</button>
            </form>
        </div>
    `,
    imports: [ReactiveFormsModule]
})

export default class ResetPasswordComponent implements OnInit {

    private _eventService = inject(ComponentsEventService)
    private _toast = inject(HotToastService)
    private _dataService = inject(DataService)
    private _route = inject(ActivatedRoute)

    form: FormGroup;
    pending = signal(false)

    ngOnInit(): void {
        this.form = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('', [Validators.required])
        }, { validators: passwordMatchValidator })
    }

    submitHandler() {
        if (this.form.invalid) return this.form.markAllAsTouched()

        const payload = { ...this.form.value, token: this._route.snapshot.queryParamMap.get('for') }
        this.submit(payload)
    }

    private submit(payload: any) {
        this.pending.set(true)
        this._dataService.resetPassword(payload).pipe(untilDestroyed(this)).subscribe({
            next: (res:any) => {
                this._toast.success(res.message)
                timer(1000).subscribe(() => location.assign('/?login=true'))

            },            
            error: (error:any) => {
                this.pending.set(false)
                if(error.message) {
                    this._toast.error(error.message)
                }
                else this._toast.error("Sorry! We encountered some challenges. try again")
            }
        })
    }

    dispatchAuthEvent(type: string) {
        this._eventService.setEvent({ authentication: type })
    }
}

