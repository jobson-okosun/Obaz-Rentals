import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import DataService from "../../services/data.service";
import { HotToastService } from "@ngxpert/hot-toast";
import { passwordMatchValidator } from "../../utils/validators";
import ComponentsEventService from "../../store/components-event";
import { NgClass } from "@angular/common";


@UntilDestroy()
@Component({
    standalone: true,
    selector: 'signup',
    imports: [ReactiveFormsModule, NgClass],
    template:  `
        <div class="flex flex-col lg:items-center lg:justify-start h-full p-5 lg:p-10">
            <h4 class="mb-7 title w-full">Signup</h4>
            <form [formGroup]="form" (ngSubmit)="submitHandler()" class="w-full">
                <div class="grid grid-cols-2 gap-2 mb-5">
                    <div (click)="form.get('role')?.setValue('GUEST')" [ngClass]="{'!border-primary' : form.get('role')!.value == 'GUEST'}" class="text-center p-4 rounded-md bg-gray-50 border hover:border-primary transition cursor-pointer">Join as Guest</div>
                    <div (click)="form.get('role')?.setValue('HOST')" [ngClass]="{'!border-primary' : form.get('role')!.value == 'HOST'}" class="text-center p-4 rounded-md bg-gray-50 border hover:border-primary transition cursor-pointer">Join as Host</div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex flex-col gap-1">
                        <label for="firstName" class="capitalize text-2xs font-medium">First Name</label>
                        <input formControlName="firstName" placeholder="John" type="text" class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="control-error">
                            @if(form.get('firstName')?.invalid && form.get('firstName')?.touched) {
                                    @if(form.get('firstName')?.hasError('required')) {
                                        First name is required
                                    }
                                    @else if(form.get('firstName')?.hasError('pattern')) {
                                        First name can only be letters
                                    }
                                    @else if(form.get('firstName')?.hasError('serverError')) {
                                        {{ form.get('firstName')!.errors?.['serverError'] }}
                                    }
                            }
                        </span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="lastName" class="capitalize text-2xs font-medium">Last Name</label>
                        <input formControlName="lastName" type="text" placeholder="Doe"  class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="control-error">
                            @if(form.get('lastName')?.invalid && form.get('lastName')?.touched) {
                                    @if(form.get('lastName')?.hasError('required')) {
                                        Last name is required
                                    }
                                    @else if(form.get('lastName')?.hasError('pattern')) {
                                        Last name can only be letters
                                    }
                                    @else if(form.get('lastName')?.hasError('serverError')) {
                                        {{ form.get('lastName')!.errors?.['serverError'] }}
                                    }
                            }
                        </span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="phone" class="capitalize text-2xs font-medium">Phone</label>
                        <input formControlName="phone" type="text" placeholder="070xxxxxxxxx" inputmode="numeric" class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="control-error">
                            @if(form.get('phone')?.invalid && form.get('phone')?.touched) {
                                    @if(form.get('phone')?.hasError('required')) {
                                        Phone number is required
                                    }
                                    @else if(form.get('phone')?.hasError('pattern')) {
                                        Phone number can only be digits
                                    }
                                    @else if(form.get('phone')?.hasError('minlength') || form.get('phone')?.hasError('maxlength')) {
                                        Phone number can only be 11 digits
                                    }
                                    @else if(form.get('phone')?.hasError('serverError')) {
                                        {{ form.get('phone')!.errors?.['serverError'] }}
                                    }
                            }
                        </span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="email" class="capitalize text-2xs font-medium">Email Address</label>
                        <input formControlName="email" placeholder="doe@example.com" type="email" class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="control-error">
                            @if(form.get('email')?.invalid && form.get('email')?.touched) {
                                @if(form.get('email')?.hasError('required')) {
                                    Email Address is required
                                }
                                @else if(form.get('email')?.hasError('email')) {
                                    Email Address is invalid
                                }
                                @else if(form.get('email')?.hasError('serverError')) {
                                    {{ form.get('email')!.errors?.['serverError'] }}
                                }
                            }
                        </span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="password" class="capitalize text-2xs font-medium">Password</label>
                        <input formControlName="password" type="password" placeholder="Enter Password" class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="control-error">
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
                        <label for="confirmPassword" class="capitalize text-2xs font-medium">Confirm Password</label>
                        <input formControlName="confirmPassword" type="password" placeholder="Confirm Password" class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-transparent focus:ring-0 focus:outline-none transition ease-linear duration-300 focus:border-b-primary text-xs font-normal placeholder:text-xs placeholder:text-gray-400">
                        <span class="control-error">
                            @if(form.get('confirmPassword')?.invalid && form.get('confirmPassword')?.touched) {
                                @if(form.get('confirmPassword')?.hasError('required')) {
                                    Confirm Password is required
                                }
                            }
                            @if(form.hasError('passwordMismatch') && form.get('confirmPassword')?.dirty) {
                                    Passwords does not match
                                }
                        </span>
                    </div>
                </div>
                <button [disabled]="pending()" type="submit" class="btn mt-5 w-full">Sign up</button>
                <p class="mt-5 leading-snug  text-center text-xs font-medium"> By continuing you agree to our <br> <a href="" class="text-primary">Terms & Conditions </a></p>
            </form>
        </div>
    `,
}) 

export default class SignupComponent { 
    form: FormGroup
    private _dataService = inject(DataService)
    private _toast = inject(HotToastService)
    private _eventService = inject(ComponentsEventService)

    pending = signal(false)
    
    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
            lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
            phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(11)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('', [Validators.required]),
            role: new FormControl('GUEST', [Validators.required])
        }, { validators: passwordMatchValidator })
    }

    submitHandler() {
        if(this.form.invalid) return this.form.markAllAsTouched()

        const payload = { ...this.form.value }
        this.signupHandler(payload)
    }

    private signupHandler(payload:any) {
        this.pending.set(true)
        this._dataService.signup(payload).pipe(untilDestroyed(this)).subscribe({
            next: (res:any) => {
                this._toast.success(res.message)
                this.dispatchAuthEvent()
                this.pending.set(false)
            },

            error: (error:any) => {
                this.pending.set(false)
                if(error.errors) {
                    Object.keys(error.errors).forEach((item:any) => {
                        if(error.errors[item].msg !== '') {
                            const control = this.form.get(error.errors[item].path)
                            control?.setErrors({ serverError:  error.errors[item].msg})
                        }
                    })
                }
                else if(error.error) {
                    this._toast.error(error.error)
                }
                else this._toast.error("Sorry! We encountered some challenges. try again")
            }
        })
    }

    dispatchAuthEvent() {
        this._eventService.setEvent({ authentication: 'login' })
    }
}

