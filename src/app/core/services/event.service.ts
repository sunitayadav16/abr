import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {
 
  constructor() { }


  loadPageGrid = new Subject<boolean>();
  loadPageGrid$ = this.loadPageGrid.asObservable();

  loadHeaderMenu = new Subject<boolean>();
  loadHeaderMenu$ = this.loadHeaderMenu.asObservable();

}
