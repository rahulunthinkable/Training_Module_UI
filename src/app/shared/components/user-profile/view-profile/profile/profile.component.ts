import { Component, Input } from '@angular/core';
import { UserDetails } from '../user.model';
import * as moment from 'moment';
import { Dialog } from '@angular/cdk/dialog';
import { ChangePasswordComponent } from '../../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() user!:UserDetails
  
  constructor(private dialog:MatDialog){}
  ngOnInit(){
    if(!this.user?.userImage){
      this.user.userImage='../../../../../../assets/Images/user.png'
    }
    this.user.joiningDate=moment(new Date(Number(this.user.joiningDate))).format('MMMM DD,YYYY')    
  }
  openChangePasswordDialog(){
    this.dialog.open(ChangePasswordComponent,{
      maxWidth:'300px'
    })

  }
}
