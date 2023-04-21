import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { LocalStorageToken } from '../localstorage.token';
import { Router } from '@angular/router';
import { InternalRoutes } from '../utils/internal-routes';
import { SpinnerService } from '../service/spinner/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('drawer') drawer : any;
  isShowCloseButton = false;
  account_user = false;
  userToken : any;
  userClick = false;

  constructor(
    @Inject(LocalStorageToken) private localstorage : Storage,
    private router: Router,
    private spinnerService : SpinnerService,
  ) { }

  userEnter() {
    setTimeout( () => {
      this.account_user = !this.account_user;
    },10);
  }

  userLeave() {
    if(this.account_user) {
      this.account_user = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 950) {
      this.drawer.close();
      this.drawer.mode = 'over';
      this.isShowCloseButton = true; 
    } else {
      this.drawer.open();
      this.drawer.mode = 'side';
      this.isShowCloseButton = false; 
    }
  }

  logout() {
    this.spinnerService.loadSpinner();
    this.localstorage.setItem('token', '');
    this.router.navigateByUrl(InternalRoutes.LOGIN_PAGE);
    this.spinnerService.closeSpinner();
  }
  
}
