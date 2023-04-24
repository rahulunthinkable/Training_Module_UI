import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-dynamic-table",
  templateUrl: "./dynamic-table.component.html",
  styleUrls: ["./dynamic-table.component.scss"],
})
export class DynamicTableComponent implements OnInit, OnChanges {
  @Input() displayedColumns: any;
  @Input() dataSource: any;
  @Input() totalLength: any;
  @Input() defaultPageNo: any;
  @Input() reinitialize: boolean = false;

  @Output() onPageSizeChange = new EventEmitter<any>();

  @ViewChild("paginator", { static: false }) paginator!: MatPaginator;

  columnNames: any = [];

  ngOnInit() {
    for (const column of this.displayedColumns) {
      this.columnNames.push(column.label);
    }
  }

  ngOnChanges() {
    if (this.dataSource && this.dataSource.length) {
      this.dataSource = new MatTableDataSource(this.dataSource);
    }
    if(this.reinitialize){
      this.paginator.pageIndex = 0;
    }
  }

  pageChange(event: any) {
    this.onPageSizeChange.emit(event);
  }
}
