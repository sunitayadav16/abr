import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectPropertyByKey'
})
export class ObjectPropertyByKeyPipe implements PipeTransform {

  transform(data: any, key: string): any {
    key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    key = key.replace(/^\./, '');           // strip a leading dot
    const keyArray = key.split('.');

    for (let i = 0, n = keyArray.length; i < n; ++i) {
        var k = keyArray[i];
        if (k in data) {
          data = data[k];
        } else {
          return;
        }
    }
    return data;
  }

}
