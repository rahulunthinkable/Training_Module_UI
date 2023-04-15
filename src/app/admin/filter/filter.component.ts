import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { user } from '../interfaces/interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() userTypeName = new EventEmitter();
  @Output() selectedDate = new EventEmitter();
  @Output() userSearchName = new EventEmitter();

  @ViewChild('dateInputValue') picker !: ElementRef;
  @ViewChild('userSearch') userSearch !: ElementRef;

  userTypes: user[] = [
    {value: 'trainer', viewValue: 'Trainer'},
    {value: 'student', viewValue: 'Student'},
    {value: 'none', viewValue: 'None'},
  ];

  userSelect(user:any) {
    this.userTypeName.emit(user.value);
  }

  dateSelect(date:any) {
    this.selectedDate.emit(this.picker.nativeElement.value);
  }

  userSearching() {
    this.userSearchName.emit(this.userSearch.nativeElement.value);
  }
}
