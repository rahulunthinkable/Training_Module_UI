import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { UserlistColdefs } from "./userlist-coldefs";
import { ErrorMessages } from "src/app/utils/error-messages";
import { SnackClasses } from "src/app/utils/snack-bar-classes";

@Component({
  selector: "app-user-table",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"],
})
export class UserTableComponent implements OnInit, OnDestroy {
  displayedColumns: any;
  dataSource: any;
  totalLength: any;
  limit = 10;
  skip = 0;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackService,
    private loader: SpinnerService
  ) {}

  ngOnInit() {
    this.displayedColumns = new UserlistColdefs().columns;
    this.getUserList();
  }

  getUserList() {
    this.loader.loadSpinner();
    const payload = {
      limit: this.limit,
      skip: this.skip,
    };
    this.apiService
      .getUserList(payload)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (res: any) => {
          this.loader.closeSpinner();
          this.dataSource = res.records;
          this.totalLength = res.totalLength;
        },
        (err) => {
          this.loader.closeSpinner();
          this.snackbarService.openSnackBar(
            ErrorMessages.SOMETHING_WENT_WRONG,
            100,
            SnackClasses.ERROR
          );
        }
      );
  }

  selectedUser(value: any) {}

  selectedDate(value: any) {}

  selectedSearch(value: any) {}

  pageChange(event: any) {
    this.limit = event.pageSize;
    this.skip = event.pageSize * event.pageIndex;
    this.getUserList();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
