import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpinnerService {
  constructor() {}

  spinnerSubject = new BehaviorSubject(false);

  loadSpinner() {
    this.spinnerSubject.next(true);
  }

  closeSpinner() {
    this.spinnerSubject.next(false);
  }
}
