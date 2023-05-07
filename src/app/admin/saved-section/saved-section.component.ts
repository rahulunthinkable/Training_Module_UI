import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-saved-section',
  templateUrl: './saved-section.component.html',
  styleUrls: ['./saved-section.component.scss']
})
export class SavedSectionComponent {
  dropDown = false;
  @Input() sectionTitle: any = "";
  @Input() sectionNumber: any = 0;
  @Input() sectionType : any = "";
  @Output() sectionEdit = new EventEmitter();

  dropDownClicked() {
    this.dropDown = !this.dropDown;
  }

  ngOnInit() { }
  editSection() {
    this.sectionEdit.emit(true);
  }
  
}
