import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailService } from 'src/app/service/User-detail-service/user-detail.service';
import { roles } from 'src/app/utils/util-constant';
import {CreateCategoryComponent} from '../../../admin/create-category/create-category.component'
import { InternalRoutes } from 'src/app/utils/internal-routes';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  panelOpenState = false;
  userRole:any
  roles=roles
  routes=InternalRoutes

  constructor(private userDetailsService:UserDetailService,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.userRole=this.userDetailsService.getUserDetails().role
  }

  createCategory(){
    this.dialog.open(CreateCategoryComponent,{
      maxWidth:'300px'
    })
  }
}
