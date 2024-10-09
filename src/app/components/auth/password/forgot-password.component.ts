import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import ComponentsEventService from "../../../store/components-event";
import { HotToastService } from "@ngxpert/hot-toast";
import DataService from "../../../services/data.service";

@UntilDestroy()
@Component({
    standalone: true,
    selector: 'forgot-password',
    template:  `

        <div class="flex flex-col lg:mt-10 p-5 lg:px-10 h-max ">
            <h4 class="text-2xl font-black font-sans">Recover Password</h4>
            <p class="opacity-80 mt-2 mb-7 text-xs">Enter email below to get instructions</p>
            <form [formGroup]="form" (ngSubmit)="submitHandler()">
                <div class="flex flex-col gap-3">
                    <div class="flex flex-col gap-1">
                        <label for="emailOrPhone" class="capitalize text-2xs font-medium">Email</label>
                        <input formControlName="email" type="text" class="w-full border border-gray-200 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="text-xs text-red-500">
                            @if(form.get('email')?.invalid && form.get('email')?.touched) {
                                @if(form.get('email')?.hasError('required')) {
                                    Email is required
                                }
                                @else if(form.get('email')?.hasError('email')) {
                                    Invalid email provided
                                }
                            }
                        </span>
                    </div>
                </div>
                <button [disabled]="pending()" type="submit" class="btn w-full">Submit</button>
                <div (click)="setAuthEvent('login')" class="cursor-pointer mt-5 leading-snug text-center text-xs font-medium">Back to login</div>
            </form>
        </div>
    `,
    imports: [ReactiveFormsModule] 
}) 

export default class ForgotPasswordComponent implements OnInit { 

    private _eventService = inject(ComponentsEventService)
    private _toastr = inject(HotToastService)
    private _dataService = inject(DataService)
    
    form: FormGroup;
    pending = signal(false)

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        })
    }

    submitHandler() {
        if(this.form.invalid) return this.form.markAllAsTouched()

        const payload = this.form.value
        this.submit(payload)
    }

    private submit(payload:any) {
        this.pending.set(true)
        this._dataService.forgotPassword(payload).pipe(untilDestroyed(this)).subscribe({
            next: (res:any) => {
                this._toastr.success(res.message)
                this.pending.set(false)
                this.form.reset()
            },            
            error: (error:any) => {
                this.pending.set(false)
                if(error.message) {
                    this._toastr.error(error.message)
                }
                else this._toastr.error("Sorry! We encountered some challenges. try again")
            }
        })
    }
    
    setAuthEvent(type: string) {
        this._eventService.setEvent({ authentication: type })
    }
}

