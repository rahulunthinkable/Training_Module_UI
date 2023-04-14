import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { user } from '../interfaces/interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  searchIcon = true;
  userTypeIcon = true;
  dateIcon = true;

  @Output() userTypeName = new EventEmitter();
  @Output() selectedDate = new EventEmitter();
  @Output() userSearchName = new EventEmitter();

  @ViewChild('dateInputValue') picker !: ElementRef;
  @ViewChild('userSearch') userSearch !: ElementRef;

  userTypes: user[] = [
    { value: 'trainer', viewValue: 'Trainer' },
    { value: 'student', viewValue: 'Student' },
    { value: 'none', viewValue: 'None' },
  ];

  obj = [
    { 'userType': null },
    { 'date': null },
    { 'userName': null },
  ];

  userSelect(user: any) {
    if (user == null) {
      this.obj[0].userType = null;
      this.userTypeName.emit(this.obj);
    } else {
      this.obj[0].userType = user.value;
      this.userTypeName.emit(this.obj);
    }
  }

  dateSelect(date: any) {
    if (date == null) {
      this.obj[1].date = null;
      this.userTypeName.emit(this.obj);
    } else {
      this.obj[1].date = this.picker.nativeElement.value;
      this.selectedDate.emit(this.obj);
    }
  }

  userSearching(query: any) {
    if (query == null) {
      this.obj[2].userName = null;
      this.userTypeName.emit(this.obj);
    } else {
      this.obj[2].userName = this.userSearch.nativeElement.value;
      this.userSearchName.emit(this.obj);
    }
  }

  userClick() {
    if (this.userTypeIcon) {
      this.userTypeIcon = false;
    } else {
      this.userTypeIcon = true;
      this.userSelect(null);
    }
  }

  dateClick() {
    if (this.dateIcon) {
      this.dateIcon = false;
    } else {
      this.dateIcon = true;
      this.dateSelect(null);
    }
  }

  searchClick() {
    if (this.searchIcon) {
      this.searchIcon = false;
    } else {
      this.searchIcon = true;
      this.userSearching(null);
    }
  }

}
