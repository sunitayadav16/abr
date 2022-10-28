import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'checkObjectKeyValue',
    pure: true
})
export class CheckObjectKeyValuePipe implements PipeTransform {

    transform(inputOb: any): any {
    let returnVal = [];
    for (let eachKey in inputOb) {
        returnVal.push({key: eachKey, value: inputOb[eachKey]})
    }
    return returnVal
    }

}