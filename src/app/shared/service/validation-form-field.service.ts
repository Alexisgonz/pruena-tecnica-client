import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormFieldService {
  fieldRequired(control: AbstractControl | null): boolean | undefined {
    return control?.hasError('required') && control?.touched;
  }

  containerClass(invalid: boolean | undefined) {
    const key = {
      'text-red-600': invalid,
      'opacity-100': invalid,
      'transition-all': invalid,
      'duration-[.5s]': invalid,
    };
    return key;
  }

constructor() { }

}
