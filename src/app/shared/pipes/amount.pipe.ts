import { Pipe, PipeTransform } from '@angular/core';
import { UtilityService } from '@app/core/services';

@Pipe({
    name: 'amount'
})
export class AmountPipe implements PipeTransform {

    constructor(private utilityService: UtilityService) { }

    transform(value: any, currency: any) {
        return this.utilityService.formatAmount(value, { currency });
    }

}
