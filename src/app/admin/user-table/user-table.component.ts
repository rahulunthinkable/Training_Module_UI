import { Component } from '@angular/core';
import { PeriodicElement } from '../interfaces/interface';

const ELEMENT_DATA: PeriodicElement[] = [
  {UserId: 1, Name: 'Hydrogen', Usertype: 'Trainer', DOJ: '11/02/12' , CourcesEnrolled:'HTML'},
  {UserId: 2, Name: 'Helium', Usertype: 'Student', DOJ: '11/02/12',  CourcesEnrolled:'HTML'},
  {UserId: 3, Name: 'Lithium', Usertype: 'Trainer', DOJ: '01/01/10',  CourcesEnrolled:'HTML'},
  {UserId: 4, Name: 'Beryllium', Usertype: 'Trainer', DOJ: '11/02/02',  CourcesEnrolled:'HTML'},
  {UserId: 5, Name: 'Boron', Usertype: 'User', DOJ: '11/02/12',  CourcesEnrolled:'HTML'},
  {UserId: 6, Name: 'Carbon', Usertype: 'Trainer', DOJ: '11/02/12',  CourcesEnrolled:'HTML'},
  {UserId: 7, Name: 'Nitrogen', Usertype: 'Trainee', DOJ: '11/02/12',  CourcesEnrolled:'HTML'},
  {UserId: 8, Name: 'Oxygen', Usertype: 'Trainer', DOJ: '11/02/12',  CourcesEnrolled:'HTML'},
  {UserId: 9, Name: 'Fluorine', Usertype: 'Trainer', DOJ: '11/02/12',  CourcesEnrolled:'HTML'},
  {UserId: 10, Name: 'Neon', Usertype: 'Trainer', DOJ: '11/02/12', CourcesEnrolled:'HTML'},
];

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  displayedColumns: string[] = ['UserId', 'Name', 'Usertype', 'DOJ','CourcesEnrolled'];
  dataSource = ELEMENT_DATA;

  selectedUser(value: any) {
  }

  selectedDate(value: any) {
  }

  selectedSearch(value: any) {
  }
}
