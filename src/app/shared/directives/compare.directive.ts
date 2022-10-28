import { NG_VALIDATORS, Validators, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[compareDirectives]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CompareDirective,
    multi: true
  }]
})
export class CompareDirective implements Validators {
  @Input() compareDirectives: any;
  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.parent?.get(this.compareDirectives);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { 'notEqual': true };
    }

    return null;
  }

}
