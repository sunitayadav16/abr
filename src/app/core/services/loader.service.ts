import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public spinnerObservable = new Subject<boolean>();
  public spinnerObservable$ = this.spinnerObservable.asObservable();
 
  constructor() { }

  /**
   * To show loader
   *
   * @memberof LoaderService
   */
   showSpinner() {
    try {
      this.spinnerObservable.next(true);
    } catch (error) {
      console.error('Error in showLoader() ' + error);
    }
  }

  /**
   * To hide loader
   *
   * @memberof LoaderService
   */
  hideSpinner() {
    try {
      this.spinnerObservable.next(false);
    } catch (error) {
      console.error('Error in hideSpinner() ' + error);
    }
  }
}
