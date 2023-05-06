import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { UserlistColdefs } from "./userlist-coldefs";
import { ErrorMessages } from "src/app/utils/error-messages";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-user-table",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"],
})
export class UserTableComponent implements OnInit, OnDestroy {
  displayedColumns: any;
  filterOptions: any;
  dataSource: any;
  totalLength: any;
  limit = 10;
  skip = 0;
  filterParams: any = {};
  reinitialize: boolean = false;
  sorting:any={
    _id:-1
  }

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackService,
    private loader: SpinnerService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.displayedColumns = new UserlistColdefs().columns;
    this.filterOptions = new UserlistColdefs().filters;
    this.getUserList();
  }

  getUserList() {
    this.dataSource = [];
    this.loader.loadSpinner();
    const payload = {
      limit: this.limit,
      skip: this.skip,
      userType: this.filterParams?.userType ? this.filterParams.userType : "",
      createdAt: this.filterParams?.createdAt ? this.filterParams.createdAt : "",
      searchFilter: this.filterParams?.searchFilter
        ? this.filterParams?.searchFilter
        : "",
        ...this.sorting
    };
    this.apiService
      .getUserList(payload)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (res: any) => {
          this.loader.closeSpinner();
          this.dataSource = res.records;
          this.dataSource = this.dataSource.map((data: any) => {
            return {
              ...data,
              isActive: data?.isActive? 'Active':'InActive',
              createdAt: moment(new Date(Number(data?.createdAt))).format(
                "MM/DD/YYYY"
              ),
            };
          });
          this.totalLength = res.totalLength;
        },
        (err) => {
          this.loader.closeSpinner();
          this.snackbarService.errorSnackBar()
        }
      );
  }

  selectedFilters(event: any) {
    this.filterParams = {
      ...event[0],
      ...event[1],
      ...event[2],
    };
    this.skip = 0;
    this.reinitialize = true;
    this.getUserList();
  }

  pageChange(event: any) {
    this.limit = event.pageSize;
    this.skip = event.pageSize * event.pageIndex;
    this.reinitialize = false;
    this.getUserList();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
