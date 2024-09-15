import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { LOCALE } from '../utils/config';


@Directive({
  standalone: true,
  selector: '[currencyInput]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CurrencyInputDirective,
      multi: true,
    },
  ]
})
export class CurrencyInputDirective implements Validator {

  private originalNumericValue: number | null = null;
  private el = inject(ElementRef) 
  private renderer = inject(Renderer2) 

  @HostListener('keyup', ['$event'])
  @HostListener('blur', ['$event'])

  onEvent(event: Event): void {
    if (event.type === 'blur') {
      this.formatCurrency(true);
    } else {
      this.formatCurrency(false);
    }
  }

  private formatNumber(n: string): string {
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  private formatCurrency(isBlur: boolean): void {
    let inputVal = this.el.nativeElement.value;

    if (inputVal === '') {
      return;
    }

    const originalLen = inputVal.length;
    const caretPos = this.el.nativeElement.selectionStart;

    if (inputVal.indexOf('.') >= 0) {
      const decimalPos = inputVal.indexOf('.');
      let leftSide = inputVal.substring(0, decimalPos);
      let rightSide = inputVal.substring(decimalPos);

      leftSide = this.formatNumber(leftSide);
      rightSide = this.formatNumber(rightSide);

      if (isBlur) {
        rightSide += '00';
      }

      rightSide = rightSide.substring(0, 2);

      inputVal = leftSide + '.' + rightSide;
    } else {
      inputVal = this.formatNumber(inputVal);
      inputVal = inputVal;

      if (isBlur) {
        inputVal += '.00';
      }
    }

    this.renderer.setProperty(this.el.nativeElement, 'value', inputVal);
    const updatedLen = inputVal.length;
    const updatedCaretPos = updatedLen - originalLen + caretPos;
    this.el.nativeElement.setSelectionRange(updatedCaretPos, updatedCaretPos);

    if (isBlur) {
      this.originalNumericValue = parseFloat(inputVal.replace(/\D/g, ''));
    }
  }

  getOriginalNumericValue(): number | null {
    return this.originalNumericValue;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const numericValue = this.originalNumericValue || 0
    if (isNaN(numericValue!) || numericValue! < 0) {
      return { invalidCurrency: true };
    }

    return null;
  }
}
