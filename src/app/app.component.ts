import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { AuthService, UtilityService } from '@core/services';

@Component({
  selector: 'app-root',
  template: `<router-outlet *ngIf="loading"></router-outlet>`
})
export class AppComponent implements OnInit {
  title = 'abr-app';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private utilityService: UtilityService,
    private router: Router,
    ) {
    this.route.queryParams.subscribe((param: Params) => {
      const userId = param.sessionKey;
      if(userId != undefined) {
        const id = +this.utilityService.encrypt(userId);
        if(!this.hasSessionStorage) this.startMimcUser(id);
      }
    })
    
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationStart) {
        window.scrollTo(0, 0)
      }
    });
  }

  startMimcUser(userId: number){
    // If user is LoggedIn
    const isLoggedIn = this.authService.isAuthenticated();
    this.loading = false;
    if(isLoggedIn && userId){
      this.authService.startMimicUser(userId).subscribe(res => {
        this.loading = true;
      })
    }else{
      this.loading = true;
    }
  }

  get hasSessionStorage(){
    return this.authService.isMimicUserSessionExist();
  }

}
