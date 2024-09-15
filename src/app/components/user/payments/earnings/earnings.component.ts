import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import DataService from '../../../../services/data.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.css'
})
export default class EarningsComponent {
  private _dataService = inject(DataService)
  private _fb = inject(FormBuilder)
  private _toast = inject(HotToastService)

  form: FormGroup

  onSubmit() { }

  initForm() {
    this.form = this._fb.group({
      amount: ['', [Validators.required, Validators.email]],
      channel: [null, Validators.required],
      password: [null]
    })
  }

  ngOnInit(): void {
    this.initForm()
  }
}
