import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'modal-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() showSpinner: boolean = false;
  constructor() {}

  fullScreen = false;

  ngOnInit(): void {}

  ngOnDestroy() {

  }
  
}
