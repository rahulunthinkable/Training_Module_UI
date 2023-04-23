import {
  AfterViewChecked,
  Component,
} from "@angular/core";
import { SpinnerService } from "./service/spinner/spinner.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewChecked {
  title = "LearningResources";
  spinner = false;
  subject: any;

  constructor(private spinnerService: SpinnerService, private router: Router) {}
  ngAfterViewChecked(): void {
    // console.log(this.router.url);
  }

  ngOnInit() {
    this.subject = this.spinnerService.spinnerSubject;
    this.subject.subscribe((data: any) => {
      this.spinner = data;
    });

  }
}
