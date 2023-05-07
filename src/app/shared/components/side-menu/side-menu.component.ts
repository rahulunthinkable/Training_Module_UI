import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/service/User-detail-service/user-detail.service';
import { roles } from 'src/app/utils/util-constant';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  panelOpenState = false;
  userRole:any
  roles=roles

  constructor(private userDetailsService:UserDetailService) {}

  ngOnInit(): void {
    this.userRole=this.userDetailsService.getUserDetails().role
  }
}
