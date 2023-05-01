import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/service/User-detail-service/user-detail.service';
import { UserDetails } from './user.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit{
  userDetails!: UserDetails;
  constructor(private userDetaisService: UserDetailService){}

  ngOnInit(){
    this.userDetails=this.userDetaisService.getUserDetails()    
  }
}
