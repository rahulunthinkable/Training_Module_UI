import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SpinnerService } from "./service/spinner/spinner.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "LearningResources";
  spinner = false;
  subject: any;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    // this.spinnerService.spinnerSubject.subscribe((data: any) => {
    //   this.spinner = data;
    // });
  }
}
