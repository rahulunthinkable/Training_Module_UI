import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { NgSwitch, NgSwitchCase } from "@angular/common";
import { user } from "src/app/admin/interfaces/interface";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent {
  searchIcon = true;
  filterIcon = true;
  dateIcon = true;
  allFilter = true;
  filterIsOpen: any = {};

  dropDown = false;
  text = false;
  date = false;

  @Input() filterData: any;
  @Output() applyFilters = new EventEmitter();

  @ViewChild("dateInputValue") picker!: ElementRef;
  @ViewChild("userSearch") userSearch!: ElementRef;
  filterObject: any = [];

  ngOnChanges() {
    this.filterData.forEach((data: any) => {
      let obj = { [data.key]: null };
      this.filterObject.push(obj);
    });

    for (let i = 0; i < this.filterObject.length; i++) {
      this.filterIsOpen[Object.keys(this.filterObject[i])[0] + "IsOpen"] = true;
    }
  }
  userSearching(query: any) {
    if (query == null) {
      this.filterObject[this.filterObject.length - 1].searchFilter = null;
    } else {
      if (this.userSearch.nativeElement.value !== "") {
        this.filterObject[this.filterObject.length - 1].searchFilter =
          this.userSearch.nativeElement.value;
      }
    }
    this.emitFilters();
  }


  closeFilter(data: any) {    
    if (this.filterIsOpen[data.key+"IsOpen"]) {
      let isDropDownFalse = true;
      let isAllDateFalse=true
      this.filterIsOpen[data.key+'IsOpen'] = false;
      this.filterData.forEach((filter: any) => {
        if (filter.type == "dropdown") {
          if (this.filterIsOpen[filter.key+'IsOpen']) {
            isDropDownFalse = false;
          }
        }
        else if(filter.type=='date'){
          if (this.filterIsOpen[filter.key+'IsOpen']) {
            isAllDateFalse = false;
          }
        }
      });      
      if (isDropDownFalse) {
        this.dropDown = false;
        this.filterData.forEach((filter:any)=>{
          if(filter.type=='dropdown'){
            this.filterIsOpen[filter.key+'IsOpen']=true
          }
        })

      }
      if (isAllDateFalse) {
        this.date = false;
        this.filterData.forEach((filter:any)=>{
          if(filter.type=='date'){
            this.filterIsOpen[filter.key+'IsOpen']=true
          }
        })
      }
      let filteredObject = this.filterObject.find(
        (object: any) => Object.keys(object)[0] == data.key
      );
      filteredObject[Object.keys(filteredObject)[0]] = null;
      this.emitFilters();
    }
  }


  searchClick(key: any) {
    if (this.filterIsOpen[key + "IsOpen"]) {
      this.text=false
      this.userSearching(null);
    }
  }

  emitFilters() {
    this.applyFilters.emit(this.filterObject);
  }

  filterSelect(filter: any, data: any) {
    let filteredObject = this.filterObject.find(
      (object: any) => Object.keys(object)[0] == data.key
    );
    if (data.key == "date") {
      filteredObject[Object.keys(filteredObject)[0]] =
        this.picker.nativeElement.value;
    } else {
      filteredObject[Object.keys(filteredObject)[0]] = filter._id;
    }
    this.emitFilters();
  }
  resetFilters(){
    window.location.reload()
  }
}
