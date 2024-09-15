import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../utils/validators'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export default class SettingsComponent {
  private _fb = new FormBuilder()
  passwordForm: FormGroup

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
     this.passwordForm = this._fb.nonNullable.group({
        currentPassword: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
     }, { validators: passwordMatchValidator})
  }

  onPasswordUpdateSubmit() {
    if(this.passwordForm.invalid) return this.passwordForm.markAllAsTouched()
    
    const formValue = this.passwordForm.value
  }
}
