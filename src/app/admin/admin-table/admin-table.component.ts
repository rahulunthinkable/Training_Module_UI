import { Component } from '@angular/core';
export interface PeriodicElement {
  userId: number;
  name: string;
  userType: string;
  doj: string;
  couresEnrolled:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {userId: 1, name: 'Hydrogen', userType: 'Trainer', doj: '11/02/12' , couresEnrolled:'HTML'},
  {userId: 2, name: 'Helium', userType: 'Student', doj: '11/02/12',  couresEnrolled:'HTML'},
  {userId: 3, name: 'Lithium', userType: 'Trainer', doj: '01/01/10',  couresEnrolled:'HTML'},
  {userId: 4, name: 'Beryllium', userType: 'Trainer', doj: '11/02/02',  couresEnrolled:'HTML'},
  {userId: 5, name: 'Boron', userType: 'User', doj: '11/02/12',  couresEnrolled:'HTML'},
  {userId: 6, name: 'Carbon', userType: 'Trainer', doj: '11/02/12',  couresEnrolled:'HTML'},
  {userId: 7, name: 'Nitrogen', userType: 'Trainee', doj: '11/02/12',  couresEnrolled:'HTML'},
  {userId: 8, name: 'Oxygen', userType: 'Trainer', doj: '11/02/12',  couresEnrolled:'HTML'},
  {userId: 9, name: 'Fluorine', userType: 'Trainer', doj: '11/02/12',  couresEnrolled:'HTML'},
  {userId: 10, name: 'Neon', userType: 'Trainer', doj: '11/02/12', couresEnrolled:'HTML'},
];

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})

export class AdminTableComponent {
  displayedColumns: string[] = ['userId', 'name', 'userType', 'doj','Cources Enrolled'];
  dataSource = ELEMENT_DATA;
}
