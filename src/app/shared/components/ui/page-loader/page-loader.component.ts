import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-loader',
  template: `
  <ngx-loader [show]="showSpinner" [fullScreen] = "fullScreen"> Loading... </ngx-loader>
  `,
  styles: []
})
export class PageLoaderComponent implements OnInit {
  @Input() showSpinner: boolean = false;
  
  fullScreen = true;
  constructor(private loader: LoaderService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loader.spinnerObservable$.subscribe(
      (result) => {
        if (result !== undefined) {
          this.showSpinner = result;
          this.cd.detectChanges();
        }
      },
      (error) => {
        console.error('Error in subscription for loader ' + error);
        this.showSpinner = false;
        this.cd.detectChanges();
      }
    );
  }

}
