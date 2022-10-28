import { of } from 'rxjs';

export class Utils {
  constructor() {
  }

  /*Handel Error Message*/
  static handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return of(error?.error);
  }

  /*Read query string and push to object*/
  static objectToQueryString(obj: any): string {
    let str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }

  /*Return array obect key value to string array*/
  static arrayObjToString(object, key) {
    if (typeof object === 'object') {
      return object.map(function (obj) {
        return obj[key];
      });
    } else {
      return JSON.parse(object).map(function (obj) {
        return obj[key];
      });
    }
  }

  /*Return array obect key value to string array*/
  static stringToArrayObj(object, key) {
    if (typeof object === 'object') {
      return object.map(function (obj) {
        return { [key]: obj };
      });
    }
  }

  /*Return object key value to number type*/
  static strNum(object, key) {
    return JSON.parse(object).map(function (obj) {
      return parseInt(obj[key]);
    });
  }

  /*Parse json object*/
  static parse(str) {
    if (str && typeof str === 'string') {
      try {
        return JSON.parse(str);
      } catch (e) {
        return 0;
      }
    } else {
      return str;
    }
  }

  /*Convert bytes size in kb, mb, gb etc format */
  static calculateBytes(sizeInBytes, longForm?: boolean) {
    if (sizeInBytes === 0) return '0 Bytes';

    const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];

    let units: any;

    units = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;

    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);
    const size = sizeInBytes / Math.pow(1024, power); // size in new units
    const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals
    const unit = units[power];
    return `${formattedSize}`;
  }

  /*Convert base64 to bytes */
  static base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  /*Download selected file from client side*/
  static saveFile(name, extension, byte) {
    var blob = new Blob([byte], { type: extension });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    link.click();
  }

  /*Create link from file to open as url */
  static returnLink(name, extension, byte) {
    var blob = new Blob([byte], { type: extension });
    return blob;
  }

  /*Set maximun lenth of OTP and Mobile */
  static allowNumber(event:any){
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) event.preventDefault();
  }

}
